const Embeds = require('./embeds.js');
const Persist = require( '../helpers/persist.js')


module.exports = {

    name: 'list',
    
    execute(msg, Items, StorageKey) {

        console.log("Items to choose from: " + Items.ServerItemsMap.get(StorageKey));

        let listEmbed = Embeds.GetBasicEmbed();
        let numberedListPrefix = 'Items in the __list__ :smiley: \n';
        let numberedList = '';
        

        if(Items.ServerItemsMap.get(StorageKey)) {
          Items.ServerItemsMap.get(StorageKey).forEach( (elem,index) => {
            numberedList += '\t\t•  ' + elem + '\n';
          });
        }

        listEmbed.setDescription(numberedList ? (numberedListPrefix+numberedList) : 'No items in the list!:confused: ');

       
       
        msg.channel.send(listEmbed);

    }

};