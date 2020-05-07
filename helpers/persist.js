
const storage = require('node-persist');

  // storage.init();
  
  async function Init() {
  
    await  storage.init();

  }

  async function SaveItemsToStorage(key, value) {
    let values = await storage.setItem(key, value);
    
    console.log('saving ', key, values);
  }
  
  
  async function LoadItemsFromStorage(key, Items) {
  
    let savedValues = await storage.getItem(key);
   
    console.log('read from storage: ', savedValues);
  
    if(savedValues) {
      savedValues.forEach(e => Items.ItemsToChooseFrom.push(e));
    }
    
  }
  
  //delete all storage content!
  async function WipeStorage(Items) {
    
    Items.ItemsToChooseFrom = [];
  
    await storage.clear();
  
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