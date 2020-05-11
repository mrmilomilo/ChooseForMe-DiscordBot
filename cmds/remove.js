const Persist = require('../helpers/persist.js');


module.exports = {

    name: 'remove',
    
    execute(msg, ItemToRemove, Items, StorageKey) {

        if(ItemToRemove) {
            const item = ItemToRemove;
  
            if(!Items.ServerItemsMap.get(StorageKey).includes(item)) {
              console.log('Item to removed does not exist in list');
              msg.reply('The item to remove is not in the __list__ :sweat_smile: ');
              return;
            }
  
            const valuesWithRemovedElem = Items.ServerItemsMap.get(StorageKey).filter( i => i!==item);
            Items.ServerItemsMap.set(StorageKey, valuesWithRemovedElem);
  
            console.log("Removed " + item);
  
            Persist.SaveItemsToStorage(StorageKey, Items);
            
            msg.reply(item + ' removed from the __list__ :neutral_face: ');
          }
    }

};