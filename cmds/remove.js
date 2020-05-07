const Persist = require('../helpers/persist.js');


module.exports = {

    name: 'remove',
    
    execute(msg, arg1, Items, StorageKey) {

        if(arg1) {
            const item = arg1;
  
            if(!Items.ItemsToChooseFrom.includes(item)) {
              console.log('Item to removed does not exist in list');
              msg.reply('The item to remove is not in the __list__ :sweat_smile: ');
              return;
            }
  
            Items.ItemsToChooseFrom = Items.ItemsToChooseFrom.filter( i => i!==item);
  
            console.log("Removed " + item);
  
            Persist.SaveItemsToStorage(StorageKey, Items.ItemsToChooseFrom);
            
            msg.reply(item + ' removed from the __list__ :neutral_face: ');
          }
    }

};