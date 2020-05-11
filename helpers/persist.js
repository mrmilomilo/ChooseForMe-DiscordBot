
const storage = require('node-persist');

  // storage.init();
  
  async function Init() {
  
    await  storage.init();

  }

  async function SaveItemsToStorage(key, Items) {

    // let values = await storage.setItem(key, value);

    let values = await storage.setItem(key, Items.ServerItemsMap.get(key));
    
    console.log('saving ', key, values);
  }
  
  
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
    

    ItemsObj.ServerItemsMap.set(key, valuesArray);
    
  }
  
  //delete all storage content!
  async function WipeStorage(StorageKey, Items) {
    
    Items.ServerItemsMap.set(StorageKey, new Array());
    
    await storage.setItem(StorageKey, new Array());

    // await storage.clear();
  
    console.log('storage wiped.')
  }
  
  
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