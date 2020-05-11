const Persist = require('../helpers/persist.js');

module.exports = {

    name: 'clearlist',
    
    execute(msg, StorageKey, Items) {

        Persist.WipeStorage(StorageKey, Items);  
        msg.reply('__list__ cleared! :scream: :scream: :scream: ');

    }

};