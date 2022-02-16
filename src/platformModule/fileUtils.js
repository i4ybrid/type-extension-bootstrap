const fs = require('fs');
const fse = require('fs-extra');
const temp = require('temp');

function endSlash(textPath) {
  if (typeof textPath === 'string' && !textPath.endsWith('/')) {
    return `${textPath}/`;
  }
  return textPath;
}

/**
 * Iteratively create folders if they don't exist, starting from rootPath
 *
 * @param {String} fullPath full path to the folder you eventually want to create
 * @param {String} rootPath path to start with, assume this path already is created. fullPath should start with rootPath.
 */
function createFolders(fullPath, rootPath) {
  const relativePath = fullPath.startsWith(rootPath)
    ? fullPath.substring(rootPath.length)
    : fullPath;
  const pathQueue = relativePath.split('/');

  let temporaryPath = `${rootPath}`;
  pathQueue.forEach((nextFolder) => {
    if (nextFolder) {
      temporaryPath = `${endSlash(temporaryPath)}${nextFolder}`;
      if (!fs.existsSync(temporaryPath)) {
        console.log(`Making new folder: [${temporaryPath}]`);
        fs.mkdirSync(temporaryPath);
      }
    }
  });
}

module.exports = {
  endSlash,
  createFolders,
};
