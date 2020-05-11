require("dotenv").config();

const Discord = require("discord.js");
const Persist = require("./helpers/persist.js");

const client = new Discord.Client();
const Embeds = require("./cmds/embeds.js");


//load commands .js files
client.commands = new Discord.Collection();
const fs = require("fs");
const commandFiles = fs.readdirSync("./cmds").filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.name, command);
}


//Items.ServerItemsMap.get(DiscordServerId) is an array 
//containing the list of elem. to choose from for that server
var Items = {
  ServerItemsMap : new Map()
};
const botname = "ChooseForMe";




client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.guilds.cache.forEach(g => {
    
    if( !Items.ServerItemsMap.get(g.id) ) {
      Persist.LoadItemsFromStorage(g.id, Items);
    }

  });

});



client.on("message", msg => {
  
  //discard any mex from other bots
  if(msg.author.bot) return;

  //someone is trying to write chooseforme without the  @ to mention
  if(msg.content.toLowerCase().includes(botname.toLowerCase())) {
      console.log("Wrote chooseforme without mention.")
      msg.reply("All chooseforme bot commands starts with a mention! Try @ChooseForMe help");

      return;
  }

  //bot accepts only cmds strating with a mention: @ChooseForMe cmd arg1  
  const mentionedUsers = msg.mentions.users;
  if( !mentionedUsers.first() || !mentionedUsers.first().username  ) return;
  if( mentionedUsers.first().username != botname ) return;

  
  //guild id identifies univocally the discord server (used to read/write persistent data)
  if(!msg.guild.id) {
    console.log("ERROR: Guild id undefined!");
    return;
  }
  
  //use server id as storage key
  const curStorageKey = msg.guild.id; 


  console.log("\n[" + new Date().toISOString() + "]", msg.content);

  const args = msg.content.split(/ +/);
  const cmd = args[1] ? args[1].toLowerCase() : "choose";   //no arguments defaults to "choose" option
  const arg1 = args[2];

  console.log('cmd: ' + cmd);


  switch(cmd) {
    case 'help':

        client.commands.get('help').execute(msg, botname);

      break;
    case "add":        

        client.commands.get('add').execute(msg, arg1, Items, curStorageKey);

      break;
    case "list":

        client.commands.get('list').execute(msg, Items, curStorageKey);

      break;
    case "remove":

        client.commands.get('remove').execute( msg, arg1, Items, curStorageKey);

      break;
    case "choose":

      client.commands.get('choose').execute(msg, Items, curStorageKey);

      break;
    case "clearlist":

        client.commands.get('clearlist').execute(msg, curStorageKey, Items);

      break;
    case "_printstorage":
      //for debug. 
      //Persist.PrintStorage();

      break;
    default:

      console.log('unrecognized cmd received: ' + cmd)
      msg.reply('Unrecognized command:grimacing: ');

      break;
  }

  
});




client.login(process.env.BOT_TOKEN);

(async () => {
  
  //init node-persist
  await Persist.Init();

})();



