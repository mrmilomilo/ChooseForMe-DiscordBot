const Discord = require("discord.js");


function GetHelpEmbed(botname) {
    return new Discord.MessageEmbed()
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
}


function GetBasicEmbed() {
    return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('ChooseForMe')
        .setThumbnail('https://i.imgur.com/hUoBidH.png')
        .setTimestamp();
}


module.exports = {

    GetHelpEmbed : GetHelpEmbed,

    GetBasicEmbed : GetBasicEmbed

};