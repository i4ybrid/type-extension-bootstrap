const Mustache = require('mustache');
const fs = require('fs');
const fse = require('fs-extra');
const temp = require('temp');
const JSZip = require('jszip');
const { isBinaryFileSync } = require('isbinaryfile');
const { dialog } = require('electron');
const path = require('path');
const log = require('electron-log');

const zip = new JSZip();
const REPLACE = {
  extensionName: 'EXTENSIONNAME__',
  extensionType: 'EXTENSION_TYPE__',
};
temp.track();

function saveDialog() {
  // Resolves to a Promise<Object>
  dialog
    .showSaveDialog({
      title: 'Select the File Path to save',
      defaultPath: path.join(__dirname, '../assets/sample.txt'),
      // defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: 'Save',
      // Restricting the user to only Text Files.
      filters: [
        {
          name: 'Text Files',
          extensions: ['txt', 'docx'],
        },
      ],
      properties: [],
    })
    .then((file) => {
      // Stating whether dialog operation was cancelled or not.
      log.info(file.canceled);
      if (!file.canceled) {
        log.info(file.filePath.toString());

        // Creating and Writing to the sample.txt file
        fs.writeFile(
          file.filePath.toString(),
          'This is a Sample File',
          (err) => {
            if (err) throw err;
            log.info('Saved!');
          }
        );
      }
      return file;
    })
    .catch((err) => {
      log.error(err);
    });
}

async function createTempFolder(folderName) {
  const tempDirectory = temp.mkdirSync(folderName);
  return tempDirectory;
}

async function copyTemplateToTempFolder(tempFolder) {
  // Needs to be relative to the main.dev.ts
  await fse.copySync('./lib/typeExtension/', tempFolder);
}

function replaceText(file, config) {
  const fileContent = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  const contentReplace = Mustache.render(fileContent, config);
  log.silly(contentReplace);
  // TODO : also rename the files?
  const filenameOutput = Mustache.render(file, config);
  if (file !== filenameOutput) {
    log.info(`Replacing file: [${file}] with [${filenameOutput}]`);
    fs.unlinkSync(file);
    fs.writeFileSync(filenameOutput, contentReplace);
  } else if (fileContent !== contentReplace) {
    fs.writeFileSync(file, contentReplace);
    log.info(`Updating file: [${file}]`);
  } else {
    log.debug(`No changes for file: [${file}]`);
  }
}

function replaceAllFields(tempFolder, config) {
  const replacePromises = [];
  const fileStack = [tempFolder];

  while (fileStack && fileStack.length > 0) {
    const directory = fileStack.pop();
    log.debug(`Temp directory = ${directory}`);
    fs.readdirSync(directory).forEach((file) => {
      const fullFilePath = `${directory}/${file}`;
      const stat = fs.statSync(fullFilePath);
      log.debug(`File = ${fullFilePath}`);
      if (stat.isDirectory()) {
        log.debug(`Found directory: ${fullFilePath}`);
        fileStack.push(fullFilePath);
      } else if (
        stat.isFile() &&
        fs.existsSync(fullFilePath) &&
        !isBinaryFileSync(fullFilePath)
      ) {
        log.debug(`Found file: ${fullFilePath}`);
        replacePromises.push(
          new Promise((resolve, reject) => {
            log.info(`Added replace promise for ${file}`);
            replaceText(fullFilePath, config);
            resolve();
          })
        );
      }
    });
  }

  Promise.all(replacePromises)
    .then(() => {
      log.info(`Zipping ${tempFolder}`);
      zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream('out.zip'))
        .on('finish', () => {
          saveDialog();
          // JSZip generates a readable stream with a "end" event,
          // but is piped here in a writable stream which emits a "finish" event.
          log.info('out.zip written.');
        });
      log.info('Done!');
      return this;
    })
    .catch((err) => {});
}
async function execute(config) {
  const tempFolder = await createTempFolder(config.moduleName);
  await copyTemplateToTempFolder(tempFolder);
  await replaceAllFields(tempFolder, config);
  return tempFolder;
}

module.exports = {
  execute,
};

// execute(require('../../config/typeExtensionSampleConfig.json'));
