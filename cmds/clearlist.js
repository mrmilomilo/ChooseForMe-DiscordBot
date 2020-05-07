const Persist = require('../helpers/persist.js');

module.exports = {

    name: 'clearlist',
    
    execute(msg, Items) {

        Persist.WipeStorage(Items);  
        msg.reply('__list__ cleared! :scream: :scream: :scream: ');

    }

};