const Embeds = require('./embeds.js');
const Persist = require('../helpers/persist.js');

module.exports = {

    name: 'add',
    
    execute(msg, arg1, Items, StorageKey) {

        if(arg1) {
            const item = arg1;
    
            if(Items.ServerItemsMap.get(StorageKey) && Items.ServerItemsMap.get(StorageKey).includes(item)) {
              console.log('Item to add already exists!');
              msg.reply('The item ' + item + 'is already in the __list__ :sweat_smile: ');
              return;
            }
            
            let array = Items.ServerItemsMap.get(StorageKey) ? Items.ServerItemsMap.get(StorageKey) : new Array;
            array.push(item);
            
            Items.ServerItemsMap.set(StorageKey, array);

            // Items.ServerItemsMap ItemsToChooseFrom.push(item);
    
            Persist.SaveItemsToStorage(StorageKey, Items);
    
            console.log('Item added: ' + item);
    
            msg.reply(item + ' added to the __list__ :sunglasses: ');
    
          }
          else {
            cmd = "syntaxerror";
          }

    }

};