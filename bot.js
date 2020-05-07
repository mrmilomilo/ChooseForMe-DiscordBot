require("dotenv").config();

const Discord = require("discord.js");
const Persist = require('./helpers/persist.js');

const client = new Discord.Client();
const Embeds = require('./cmds/embeds.js');

//load commands .js files
client.commands = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.name, command);
}


const botname = 'ChooseForMe';
const StorageKey = 'itemsToChooseFrom';     //todo: nomeserver.nomecanale dovrebbe essere abbastanza univoco da rendere questo bot multiserver
var Items = {ItemsToChooseFrom : []};




client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", msg => {
  
  if(msg.author.bot) return;

  //someone is trying to write chooseforme without the  @ to mention
  if(msg.content.toLowerCase().includes('chooseforme')) {
      console.log('Wrote chooseforme without mention.')
      msg.reply('All chooseforme bot commands starts with a mention! Try @ChooseForMe help');
      return;
  }

  //syntax: @ChooseForMe cmd arg1  
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

        client.commands.get('help').execute(msg, botname);

      break;
    case "add":        

        client.commands.get('add').execute(msg, arg1, Items, StorageKey);

      break;
    case "list":

        client.commands.get('list').execute(msg, Items);

      break;
    case "remove":

        client.commands.get('remove').execute( msg, arg1, Items, StorageKey);

      break;
    case "pick":
    case "choose":
    case "chooseforme":

      client.commands.get('choose').execute(msg, Items);

      break;
    case "clearlist":

        client.commands.get('clearlist').execute(msg, Items);

      break;
    case "_printstorage":
      //for debug.
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
  
  await Persist.Init();

  Persist.LoadItemsFromStorage(StorageKey, Items);

})();

