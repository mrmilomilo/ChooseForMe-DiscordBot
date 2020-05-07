const Embeds = require('./embeds.js');


module.exports = {

    name: 'list',
    
    execute(msg, Items) {

        console.log("Items to choose from: " + Items.ItemsToChooseFrom);

        let listEmbed = Embeds.GetBasicEmbed();
        let numberedListPrefix = 'Items in the __list__ :smiley: \n';
        let numberedList = '';
        
        Items.ItemsToChooseFrom.forEach( (elem,index) => {
          numberedList += '\t\t•  ' + elem + '\n';
        });

        listEmbed.setDescription(numberedList ? (numberedListPrefix+numberedList) : 'No items in the list!:confused: ');

       
       
        msg.channel.send(listEmbed);

    }

};