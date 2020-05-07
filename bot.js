require("dotenv").config();

const Discord = require("discord.js")
const storage = require('node-persist');
const fs = require('fs');

const client = new Discord.Client();
const Embeds = require('./cmds/embeds.js');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.name, command);
}


const botname = 'ChooseForMe';
var ItemsToChooseFrom = [];
const StorageKey = 'itemsToChooseFrom';




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

        msg.channel.send(Embeds.GetHelpEmbed(botname));

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
        
        client.commands.get('list').execute(msg, ItemsToChooseFrom);

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

          msg.reply(item + ' removed from the __list__ :neutral_face: ');
        }
      
      break;
    case "pick":
    case "choose":
    case "chooseforme":

      const picked = ItemsToChooseFrom[Math.floor(Math.random() * ItemsToChooseFrom.length)];
      
      console.log("Picked " + picked);

      let pickedElemText = 'I have choosen: **' + picked + '**';

      msg.channel.send(Embeds.GetBasicEmbed().setDescription(pickedElemText));

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