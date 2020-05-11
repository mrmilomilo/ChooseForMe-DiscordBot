const Embeds = require('./embeds.js');
const Persist = require('../helpers/persist.js');

module.exports = {

    name: 'add',
    
    execute(msg, ItemToAdd, Items, StorageKey) {

        if(ItemToAdd) {
            const item = ItemToAdd;
    
            //is item already in the list?
            if(Items.ServerItemsMap.get(StorageKey) && Items.ServerItemsMap.get(StorageKey).includes(item)) {
              console.log('Item to add already exists!');
              msg.reply('The item ' + item + ' is already in the __list__ :sweat_smile: ');
              return;
            }
            
            //add item to array in ServerItemsMap
            let array = Items.ServerItemsMap.get(StorageKey) ? Items.ServerItemsMap.get(StorageKey) : new Array;
            array.push(item);
            Items.ServerItemsMap.set(StorageKey, array);

            //write to file
            Persist.SaveItemsToStorage(StorageKey, Items);
    
            console.log('Item added: ' + item);    
            msg.reply(item + ' added to the __list__ :sunglasses: ');
    
          }
          else {
            cmd = "syntaxerror";
          }

    }

};