require("dotenv").config();

const Discord = require("discord.js")
const storage = require('node-persist');

const client = new Discord.Client();
const botname = 'ChooseForMe';
var ItemsToChooseFrom = [];
const StorageKey = 'itemsToChooseFrom';


var helpEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('ChooseForMe')
.setDescription('**Selects a random element from a __list__ for you, so you don\'t have to decide!** (Good to choose a game to play with friends in a non democratic way:smirk: )')
.setThumbnail('https://i.imgur.com/hUoBidH.png')
.addFields(
    { name: `@${botname} [no arguments]`, value: 'Chooses for you an element from the __list__.'},
    { name: `@${botname} list`, value: 'Display all elements in the __list__. (One of these is going to be selected randomly).' },
    { name: `@${botname} add *item*`, value: 'Add *item* to the __list__.' },
    { name: `@${botname} remove *item*`, value: 'Remove *item* from the __list__.' },
    { name: `@${botname} clearlist`, value: 'Self-explanatory. Not reversible.' },
    { name: `@${botname} help`, value: 'Prints this message' },
  )
.setTimestamp();

const listEmbedTemplate = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('ChooseForMe')
.setThumbnail('https://i.imgur.com/hUoBidH.png')
.setTimestamp();

const listPickedEmbedTemplate = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('ChooseForMe')
.setThumbnail('https://i.imgur.com/hUoBidH.png')
.setTimestamp();



client.on("ready", () => {

  console.log(`Logged in as ${client.user.tag}!`);

});


client.on("message", msg => {
  
  if(msg.author.bot) return;

  //someone is trying to 
  if(msg.content.toLowerCase().includes('chooseforme')) {
      console.log('Wrote chooseforme without mention.')

      msg.reply('All chooseforme bot commands starts with a mention! Try @ChooseForMe help');

      return;
  }

  //@ChooseForMe cmd arg1  
  const mentionedUsers = msg.mentions.users;
  if( !mentionedUsers.first() || !mentionedUsers.first().username  ) return;

  console.log('\n');
  console.log("[" + new Date().toISOString() + "]", msg.content);

  const args = msg.content.split(/ +/);
  const cmd = args[1] ? args[1].toLowerCase() : "choose";
  const arg1 = args[2];

  console.log('cmd: ' + cmd);
  // console.log('args: ' + args);

  switch(cmd) {
    case 'help':
        console.log('Help cmd received.');

        msg.channel.send(helpEmbed);

      break;
    case "add":
      
      if(arg1) {
        const item = arg1;

        if(ItemsToChooseFrom.includes(item)) {
          console.log('Item to add already exists!');
          msg.reply('The item ' + item + 'is already in the __list__ :sweat_smile: ');
          return;
        }

        ItemsToChooseFrom.push(item);

        SaveItemsToStorage(StorageKey, ItemsToChooseFrom);

        console.log('Item added: ' + item);

        msg.reply(item + ' added to the __list__ :sunglasses: ');

      }
      else {
        cmd = "syntaxerror";
      }

      break;
    case "list":

        console.log("Items to choose from: " + ItemsToChooseFrom);

        let listEmbed = listEmbedTemplate;
        let numberedListPrefix = 'Items in the __list__ :smiley: \n';
        let numberedList = '';
        
        ItemsToChooseFrom.forEach( (elem,index) => {
          numberedList += '\t\t•  ' + elem + '\n';
        });

        listEmbed.setDescription(numberedList ? (numberedListPrefix+numberedList) : 'No items in the list!:confused: ');

        msg.channel.send(listEmbed);
        
      break;
    case "remove":

        if(arg1) {
          const item = arg1;

          if(!ItemsToChooseFrom.includes(item)) {
            console.log('Item to removed does not exist in list');
            msg.reply('The item to remove is not in the __list__ :sweat_smile: ');
            return;
          }

          ItemsToChooseFrom = ItemsToChooseFrom.filter( i => i!==item);

          console.log("Removed " + item);

          SaveItemsToStorage(StorageKey, ItemsToChooseFrom);

          msg.reply(item + 'removed from the __list__ :neutral_face: ');
        }
      
      break;
    case "pick":
    case "choose":
    case "chooseforme":

      const picked = ItemsToChooseFrom[Math.floor(Math.random() * ItemsToChooseFrom.length)];
      
      console.log("Picked " + picked);

      let pickedElemText = 'I have choosen: **' + picked + '**';

      msg.channel.send(listPickedEmbedTemplate.setDescription(pickedElemText));

      break;
    case "clearlist":
        WipeStorage();  
        msg.reply('__list__ cleared! :scream: :scream: :scream: ');
      break;
    case "_printstorage":
        PrintStorage();
      break;
    default:
      console.log('unrecognized cmd received: ' + cmd)
      msg.reply('Unrecognized command:grimacing: ');
      break;
  }

  
});




client.login(process.env.BOT_TOKEN);

(async () => {
  
  await storage.init();

  LoadItemsFromStorage(StorageKey);

})();


async function SaveItemsToStorage(key, value) {
  let values = await storage.setItem(key, value);
  
  console.log('saving ', key, values);
}


async function LoadItemsFromStorage(key) {
  let savedValues = await storage.getItem(key);
 
  console.log('read from storage: ', savedValues);

  if(savedValues) {
    savedValues.forEach(e => ItemsToChooseFrom.push(e));
  }
  
}

//delete all storage content!
async function WipeStorage() {
  
  ItemsToChooseFrom = [];

  await storage.clear();

  console.log('storage wiped.')
}


async function PrintStorage() {
  let valuesInStorage = await storage.values();
  console.log(valuesInStorage);
}