
const storage = require('node-persist');

  
async function Init() {

  await  storage.init();

}



//write items of a disocrd server to a file (one file per discord server)
async function SaveItemsToStorage(key, Items) {

  let values = await storage.setItem(key, Items.ServerItemsMap.get(key));
    
  console.log('saving ', key, values);

}

  

//read items array for a given discord server(identified with key)
async function LoadItemsFromStorage(key, ItemsObj) {

  let savedValues = await storage.getItem(key);
    
  console.log('read from storage: ', savedValues);

  let valuesArray = [];
  if(savedValues && Object.keys(savedValues).length) {
    savedValues.forEach(e =>  {
      valuesArray.push(e);
    });
  }
  else {
    console.log('Error loading items from storage! Is storage empt');
    return;
  }

  //save the read values in the ServerItemsMap to be used by other functions
  ItemsObj.ServerItemsMap.set(key, valuesArray); 

}
  


//delete all items for a given server
async function WipeStorage(StorageKey, Items) {
  
  Items.ServerItemsMap.set(StorageKey, new Array());
  
  await storage.setItem(StorageKey, new Array());

  console.log('storage ' + StorageKey + ' wiped.')

}
  


//debug method. Not called.
async function PrintStorage() {
  let valuesInStorage = await storage.values();
  console.log(valuesInStorage);

}



module.exports = {
  Init : Init,
  SaveItemsToStorage : SaveItemsToStorage,
  LoadItemsFromStorage : LoadItemsFromStorage,
  WipeStorage : WipeStorage,
  PrintStorage : PrintStorage
};
