/* eslint-disable no-underscore-dangle */
const Mustache = require('mustache');
const fs = require('fs');
const fse = require('fs-extra');
const temp = require('temp');
const { isBinaryFileSync } = require('isbinaryfile');
const log = require('electron-log');
const { endSlash, createFolders } = require('./fileUtils');

const REPLACE = {
  extensionName: 'EXTENSIONNAME__',
  extensionType: 'EXTENSIONTYPE__',
  documentTypeLabel: 'DOCUMENTTYPELABEL__',
};
temp.track();

function isEmpty(obj) {
  return !obj || Object.keys(obj) === 0;
}

async function createTempFolder(folderName) {
  const tempDirectory = temp.mkdirSync(folderName);
  return tempDirectory;
}

async function copyTemplateToFolder(template, tempFolder) {
  // Needs to be relative to the main.dev.ts
  await fse.copySync(template, tempFolder);
}

async function copyTempToTestFolder(tempFolder, config) {
  let { platformModuleFolder, customerKey } = config;
  if (typeof platformModuleFolder === 'string') {
    platformModuleFolder = platformModuleFolder.replace('~', process.env.HOME);
  }
  platformModuleFolder = endSlash(platformModuleFolder);
  customerKey = endSlash(customerKey);
  const fullTestFolder = `${platformModuleFolder}test/customer/${customerKey}${config.moduleName}`;
  createFolders(fullTestFolder, platformModuleFolder);

  log.info(
    `copyTempToCustomerFolder: Copying data to the following older: [${fullTestFolder}]`
  );
  await fse.copySync(tempFolder, fullTestFolder, { overwrite: false });
}

function replaceText(file, config) {
  const fileContent = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  const contentReplace = Mustache.render(fileContent, config);
  log.silly(contentReplace);

  const fileText = file
    .toString()
    .replaceAll(REPLACE.extensionType, config.event.value)
    .replaceAll(REPLACE.extensionName, config.typeExtensionFunctionName)
    .replaceAll(REPLACE.documentTypeLabel, config.documentType.label);

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
          new Promise((resolve) => {
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

function determineKey(seedData) {
  const returnVal = {};
  let seedDataArray = [];
  if (seedData instanceof Array) {
    seedDataArray = seedData;
  } else {
    seedDataArray.push(seedData);
  }

  seedDataArray.forEach((seedString) => {
    let seedObject;
    try {
      seedObject = JSON.parse(seedString);
      // eslint-disable-next-line no-empty
    } catch (e) {}
    if (seedObject && seedObject.__metadata && seedObject.__metadata.self) {
      const selfUrl = seedObject.__metadata.self;
      let queryKey;
      if (selfUrl.indexOf('query') >= 0 && selfUrl.indexOf('rest') >= 0) {
        queryKey = selfUrl.slice(selfUrl.indexOf('rest'));
      } else {
        queryKey = selfUrl.slice(selfUrl.lastIndexOf('/') + 1);
      }
      returnVal[queryKey] = seedObject;
    }
  });

  return JSON.stringify(returnVal);
}

async function createTypeExtensionTest(config) {
  // TOOD Complete this
  let configCopy = { ...config };
  log.info(configCopy);
  const containsSeed = !isEmpty(configCopy.seedData);
  const templateFolder = containsSeed
    ? './lib/unitTestWithSeed/'
    : './lib/unitTestNoSeed/';
  if (containsSeed) {
    const keyedSeedData = determineKey(config.seedData);
    configCopy = Object.assign(config, { formattedSeedData: keyedSeedData });
  }
  const tempFolder = await createTempFolder(configCopy.moduleName);
  await copyTemplateToFolder(templateFolder, tempFolder);
  await replaceAllFields(tempFolder, configCopy);
  await copyTempToTestFolder(tempFolder, configCopy);
  return tempFolder;
}

module.exports = {
  createTypeExtensionTest,
};

// execute(require('../../config/typeExtensionSampleConfig.json'));
