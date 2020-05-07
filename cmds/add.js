const Embeds = require('./embeds.js');
const Persist = require('../helpers/persist.js');

module.exports = {

    name: 'add',
    
    execute(msg, arg1, Items, StorageKey) {

        if(arg1) {
            const item = arg1;
    
            if(Items.ItemsToChooseFrom.includes(item)) {
              console.log('Item to add already exists!');
              msg.reply('The item ' + item + 'is already in the __list__ :sweat_smile: ');
              return;
            }
    
            Items.ItemsToChooseFrom.push(item);
    
            Persist.SaveItemsToStorage(StorageKey, Items.ItemsToChooseFrom);
    
            console.log('Item added: ' + item);
    
            msg.reply(item + ' added to the __list__ :sunglasses: ');
    
          }
          else {
            cmd = "syntaxerror";
          }

    }

};