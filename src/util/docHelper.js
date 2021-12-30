const documentTypes = require('../../lib/constants/documentTypes.json');

function getArrayOfDocTypes() {
  const returnValue = [];

  Object.entries(documentTypes).forEach((entry) => {
    const [docTypeIn, obj] = entry;
    returnValue.push({
      docType: docTypeIn,
      version: obj.version,
      events: obj.events,
    });
  });

  return returnValue;
}

function getAllDocumentsByVersion(version) {
  return getArrayOfDocTypes().filter((docObject) => {
    return docObject.version === version;
  });
}

module.exports = {
  getArrayOfDocTypes,
  getAllDocumentsByVersion,
};
