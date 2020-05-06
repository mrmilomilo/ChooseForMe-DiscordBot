require("dotenv").config();

const Discord = require("discord.js")
const storage = require('node-persist');

const client = new Discord.Client();
const botname = 'ChooseForMe';
var ItemsToChooseFrom = [];
const StorageKey = 'itemsToChooseFrom';


client.on("ready", () => {

  console.log(`Logged in as ${client.user.tag}!`);

});


client.on("message", msg => {
  
  if(msg.author.bot) return;

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
    case "add":
      
      if(arg1) {
        const item = arg1;

        ItemsToChooseFrom.push(item);
        
        console.log('Item added: ' + item);

        SaveItemsToStorage(StorageKey, ItemsToChooseFrom);
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

          SaveItemsToStorage(StorageKey, ItemsToChooseFrom);
        }
      
      break;
    case "pick":
    case "choose":
    case "chooseforme":

      const picked = ItemsToChooseFrom[Math.floor(Math.random() * ItemsToChooseFrom.length)];
      
      console.log("Picked " + picked);

      break;
    case "_wipe":
        WipeStorage();  
      break;
    case "_printstorage":
        PrintStorage();
      break;
    default:
      console.log('unrecognized cmd received: ' + cmd)
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