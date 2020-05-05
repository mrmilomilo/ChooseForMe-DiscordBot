require("dotenv").config();

const Discord = require("discord.js")
const client = new Discord.Client();
const botname = 'ChooseForMe';

var ItemsToChooseFrom = [];

client.on("ready", () => {

  console.log(`Logged in as ${client.user.tag}!`);

});


client.on("message", msg => {
  const mentionedUsers = msg.mentions.users;
  
  //@ChooseForMe cmd arg1  
  if( !mentionedUsers.first() || !mentionedUsers.first().username  ) return;


  const args = msg.content.split(/ +/);
  const cmd = args[1];

  console.log('cmd: ' + cmd);
  console.log('args: ' + args);

  switch(cmd) {
    case "add":
      
      if(args[2]) {
        const item = args[2];

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

        if(args[2]) {
          const item = args[2];

          ItemsToChooseFrom = ItemsToChooseFrom.filter( i => i!==item);

          console.log("Removed " + item);
        }
      
      break;
    case "pick":

      const picked = ItemsToChooseFrom[Math.floor(Math.random() * ItemsToChooseFrom.length)];
      
      console.log("Picked " + picked);

      break;
    default:
      console.log('unrecognized cmd received: ' + cmd)
      break;
  }

  
});

client.login(process.env.BOT_TOKEN);

