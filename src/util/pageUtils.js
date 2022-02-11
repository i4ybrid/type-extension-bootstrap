function flattenDocuments(dataSet, filterVersion) {
  const returnValue = [];
  Object.keys(dataSet).forEach((docKey) => {
    if (!filterVersion || filterVersion === dataSet[docKey].version) {
      returnValue.push(docKey);
    }
  });
  return returnValue;
}

function flattenEvents(dataSet, filterDocument) {
  const returnValue = [];

  Object.keys(dataSet).forEach((documentType) => {
    const document = dataSet[documentType];
    Object.keys(document.events).forEach((event) => {
      if (
        (!filterDocument || filterDocument === documentType) &&
        returnValue.indexOf(event) < 0
      ) {
        returnValue.push(event);
      }
    });
  });

  return returnValue;
}

function flattenRoles(dataSet, filterEvent) {
  const returnValue = ['Buyer', 'Seller'];

  Object.values(dataSet).forEach((document) => {
    Object.values(document.events).forEach((events) => {
      events.forEach((event) => {
        if (
          (!filterEvent || filterEvent === event) &&
          returnValue.indexOf(event) < 0
        ) {
          returnValue.push(event);
        }
      });
    });
  });

  return returnValue;
}

function getElementValue(elementName, fallbackValue) {
  let returnVal;
  if (fallbackValue) {
    returnVal = fallbackValue;
  }
  const element = document.getElementById(elementName);
  if (element) {
    returnVal = element.value;
  }
  return returnVal;
}

function inlineReplaceArray(arr, newArr) {
  arr.length = 0;
  newArr.forEach((newElement) => {
    arr.push(newElement);
  });
}

module.exports = {
  flattenDocuments,
  flattenEvents,
  flattenRoles,
  getElementValue,
  inlineReplaceArray,
};
