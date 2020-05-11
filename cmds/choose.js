const Embeds = require('./embeds.js');


module.exports = {

    name: 'choose',
    
    execute(msg, Items, StorageKey) {
        const items = Items.ServerItemsMap.get(StorageKey);

        if(!items || items.length==0) {
            msg.reply('List is empty. Try @ChooseForMe help');
            return;
        }

        const picked = items[Math.floor(Math.random() * items.length)];
      
        console.log("Picked " + picked);
  
        let pickedElemText = 'I have choosen: **' + picked + '**';
  
        msg.channel.send(Embeds.GetBasicEmbed().setDescription(pickedElemText));

    }

};