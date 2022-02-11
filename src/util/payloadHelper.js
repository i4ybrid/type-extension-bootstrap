const fs = require('fs');

const CONFIG_FOLDER = 'settings';
const GITIGNORE_FILENAME = '.gitignore';
const SETTINGS_FILENAME = 'settings.json';
const PAYLOAD_TEMPLATE = {
  apiVersion: {
    options: ['310', '311'],
    value: null,
    label: null,
  },
  documentType: {
    options: [],
    value: null,
    label: null,
  },
  typeExtensionRank: '10',
  typeExtensionFunctionName: null,
  moduleName: null,
  event: {
    options: [],
    value: null,
    label: null,
  },
  role: {
    options: [],
    value: null,
    label: null,
  },
  platformModuleFolder: '~/code/gtnexus/platform/',
  customerKey: null,
};

function supplementPayload(payload) {
  const {
    apiVersion,
    documentType,
    typeExtensionRank,
    typeExtensionFunctionName,
    moduleName,
    event,
    role,
    platformModuleFolder,
    customerKey,
  } = PAYLOAD_TEMPLATE;

  return {
    apiVersion: Object.assign(apiVersion, payload.apiVersion),
    documentType: Object.assign(documentType, payload.documentType),
    typeExtensionRank: payload.typeExtensionRank || typeExtensionRank,
    typeExtensionFunctionName:
      payload.typeExtensionFunctionName || typeExtensionFunctionName,
    moduleName: payload.moduleName || moduleName,
    event: Object.assign(event, payload.event),
    role: Object.assign(role, payload.role),
    platformModuleFolder: payload.platformModuleFolder || platformModuleFolder,
    customerKey: payload.customerKey || customerKey,
  };
}

function loadPayload() {
  let returnVal = {};

  if (fs.existsSync(CONFIG_FOLDER)) {
    const configStat = fs.statSync(CONFIG_FOLDER);

    if (
      configStat.isDirectory() &&
      fs.existsSync(`${CONFIG_FOLDER}/${SETTINGS_FILENAME}`)
    ) {
      returnVal = JSON.parse(
        fs.readFileSync(`${CONFIG_FOLDER}/${SETTINGS_FILENAME}`, {
          encoding: 'utf8',
        })
      );
    }
  }

  return returnVal;
}

function savePayload(payload) {
  if (!fs.existsSync(CONFIG_FOLDER)) {
    fs.mkdirSync(CONFIG_FOLDER);
  }
  if (!fs.existsSync(`${CONFIG_FOLDER}/${GITIGNORE_FILENAME}`)) {
    fs.writeFileSync(
      `${CONFIG_FOLDER}/${GITIGNORE_FILENAME}`,
      `${SETTINGS_FILENAME}\n`,
      { encoding: 'utf8' }
    );
  }
  fs.writeFileSync(
    `${CONFIG_FOLDER}/${SETTINGS_FILENAME}`,
    JSON.stringify(supplementPayload(payload), null, 2),
    { encoding: 'utf8' }
  );
}

module.exports = {
  supplementPayload,
  loadPayload,
  savePayload,
};
