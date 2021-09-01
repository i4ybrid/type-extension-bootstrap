const Mustache = require('mustache');
const fs = require('fs');
const fse = require('fs-extra');
const temp = require('temp');
const { isBinaryFileSync } = require('isbinaryfile');
const Logger = require('../util/logger');

temp.track();
if (!global.logger) {
  Logger.makeLogger();
}
const { logger } = global;

async function createTempFolder(folderName) {
  const tempDirectory = temp.mkdirSync(folderName);
  return tempDirectory;
}

async function copyTemplateToTempFolder(tempFolder) {
  await fse.copySync('../../lib/typeExtension/', tempFolder);
}

function replaceText(file, config) {
  const fileContent = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  const contentReplace = Mustache.render(fileContent, config);
  logger.silly(contentReplace);
  // TODO : also rename the files?
  const filenameOutput = Mustache.render(file, config);
  if (file !== filenameOutput) {
    logger.info(`Replacing file: [${file}] with [${filenameOutput}]`);
    fs.unlinkSync(file);
    fs.writeFileSync(filenameOutput, contentReplace);
  } else if (fileContent !== contentReplace) {
    fs.writeFileSync(file, contentReplace);
    logger.info(`Updating file: [${file}]`);
  } else {
    logger.debug(`No changes for file: [${file}]`);
  }
}

function replaceAllFields(tempFolder, config) {
  const replacePromises = [];
  const fileStack = [tempFolder];

  while (fileStack && fileStack.length > 0) {
    const directory = fileStack.pop();
    logger.debug(`Temp directory = ${directory}`);
    fs.readdirSync(directory).forEach((file) => {
      const fullFilePath = `${directory}/${file}`;
      const stat = fs.statSync(fullFilePath);
      logger.debug(`File = ${fullFilePath}`);
      if (stat.isDirectory()) {
        logger.debug(`Found directory: ${fullFilePath}`);
        fileStack.push(fullFilePath);
      } else if (
        stat.isFile() &&
        fs.existsSync(fullFilePath) &&
        !isBinaryFileSync(fullFilePath)
      ) {
        logger.debug(`Found file: ${fullFilePath}`);
        replacePromises.push(
          new Promise((resolve, reject) => {
            logger.info(`Added replace promise for ${file}`);
            replaceText(fullFilePath, config);
            resolve();
          })
        );
      }
    });
  }

  Promise.all(replacePromises)
    .then(() => {
      // TODO zip up files and move it into output
      logger.info('Done!');
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

execute(require('../../config/typeExtensionSampleConfig.json'));
