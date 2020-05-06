require("dotenv").config();

const Discord = require("discord.js")
const client = new Discord.Client();
const botname = 'ChooseForMe';

var ItemsToChooseFrom = [];

client.on("ready", () => {

  console.log(`Logged in as ${client.user.tag}!`);

});


client.on("message", msg => {
  
  if(msg.author.bot) return;

  //@ChooseForMe cmd arg1  
  const mentionedUsers = msg.mentions.users;
  if( !mentionedUsers.first() || !mentionedUsers.first().username  ) return;

  console.log('\n');
  console.log("[" + new Date().toISOString() + "]" + msg.content);

  const args = msg.content.split(/ +/);
  const cmd = args[1] ? args[1].toLowerCase() : "choose";
  const arg1 = args[2];

  console.log('cmd: ' + cmd);
  // console.log('args: ' + args);

  switch(cmd) {
    case "add":
      
      if(arg1) {
        const item = arg1;

        ItemsToChooseFrom.push(item);
        
        console.log('Item added: ' + item);
      }
      else {
        cmd = "syntaxerror";
      }

      break;
    case "list":

        console.log("Items to choose from: " + ItemsToChooseFrom);

      break;
    case "remove":

        if(arg1) {
          const item = arg1;

          ItemsToChooseFrom = ItemsToChooseFrom.filter( i => i!==item);

          console.log("Removed " + item);
        }
      
      break;
    case "pick":
    case "choose":
    case "chooseforme":

      const picked = ItemsToChooseFrom[Math.floor(Math.random() * ItemsToChooseFrom.length)];
      
      console.log("Picked " + picked);

      break;
    default:
      console.log('unrecognized cmd received: ' + cmd)
      break;
  }

  
});

client.login(process.env.BOT_TOKEN);

