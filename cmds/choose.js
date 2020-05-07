const Embeds = require('./embeds.js');


module.exports = {

    name: 'choose',
    
    execute(msg, Items) {

        if(Items.ItemsToChooseFrom.length==0) {
            msg.reply('List is empty. Try @ChooseForMe help');
            return;
        }

        const picked = Items.ItemsToChooseFrom[Math.floor(Math.random() * Items.ItemsToChooseFrom.length)];
      
        console.log("Picked " + picked);
  
        let pickedElemText = 'I have choosen: **' + picked + '**';
  
        msg.channel.send(Embeds.GetBasicEmbed().setDescription(pickedElemText));

    }

};