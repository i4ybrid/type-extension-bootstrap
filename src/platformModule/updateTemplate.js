const Mustache = require('mustache');
const fs = require('fs');
const fse = require('fs-extra');
const temp = require('temp');
const { isBinaryFileSync } = require('isbinaryfile');
const { dialog } = require('electron');
const log = require('electron-log');
const archiver = require('archiver');

const REPLACE = {
  extensionName: 'EXTENSIONNAME__',
  extensionType: 'EXTENSIONTYPE__',
};
temp.track();

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
  const fileText = file
    .toString()
    .replaceAll(REPLACE.extensionType, config.event.value)
    .replaceAll(REPLACE.extensionName, config.typeExtensionFunctionName);

  const filenameOutput = Mustache.render(fileText, config);
  if (file.toString() !== filenameOutput) {
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
            log.debug(`Added replace promise for ${file}`);
            replaceText(fullFilePath, config);
            resolve();
          })
        );
      }
    });
  }

  Promise.all(replacePromises).catch((err) => {
    log.err(err);
  });
}

function writeZipToFile(tempFolder, file) {
  log.info(`Writing file: ${file.filePath.toString()}`);
  log.info(`Zipping ${tempFolder}`);

  const output = fs.createWriteStream(file.filePath.toString());
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on('end', () => {
    log.debug('Data has been drained');
  });

  output.on('close', () => {
    log.debug(`${archive.pointer()} total bytes`);
    log.debug(
      'archiver has been finalized and the output file descriptor has closed.'
    );
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      log.warn(err);
    } else {
      throw err;
    }
  });
  archive.on('error', (err) => {
    throw err;
  });
  archive.pipe(output);
  archive.directory(tempFolder, false);
  archive.finalize();
  return true;
}

function saveTempToZip(moduleName) {
  // Resolves to a Promise<Object>
  return dialog
    .showSaveDialog({
      title: 'Select the File Path to save',
      buttonLabel: 'Save',
      defaultPath: `${moduleName}.zip`,
      filters: [
        {
          name: 'Zip Files',
          extensions: ['zip'],
        },
      ],
      properties: [],
    })
    .catch((err) => {
      log.error(err);
    });
}

async function execute(config) {
  log.info(config);
  const tempFolder = await createTempFolder(config.moduleName);
  await copyTemplateToTempFolder(tempFolder);
  await replaceAllFields(tempFolder, config);
  const filename = await saveTempToZip(config.moduleName);
  writeZipToFile(tempFolder, filename);
  return tempFolder;
}

module.exports = {
  execute,
};

// execute(require('../../config/typeExtensionSampleConfig.json'));
