function capitalizeKeys(object) {
    if (typeof object !== 'object' || object === null) {
      return object; 
    }
  
    if (Array.isArray(object)) {
      return object.map((item) => capitalizeKeys(item));
    }
  
    let newObject = {};
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); 
        newObject[capitalizedKey] = capitalizeKeys(object[key]); 
      }
    }
    return newObject;
  }

  function removeModel(object){
    let stringifyJson = JSON.stringify(object);
    let removedModel = JSON.parse(stringifyJson);

    return removedModel;
  }

  function lowercaseKeys(object){
    if (typeof object !== 'object' || object === null) {
      return object; 
    }
  
    if (Array.isArray(object)) {
      return object.map((item) => lowercaseKeys(item));
    }
  
    let newObject = {};
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        let lowerCaseKey = key.charAt(0).toLocaleLowerCase() + key.slice(1); 
        newObject[lowerCaseKey] = lowercaseKeys(object[key]); 
      }
    }
    return newObject;
  }

  module.exports = {
    capitalizeKeys,
    lowercaseKeys,
    removeModel
  }