const Embeds = require('./embeds.js');


module.exports = {

    name: 'help',
    
    execute(msg, botname) {

        console.log('Help cmd received.');

        msg.channel.send(Embeds.GetHelpEmbed(botname));

    }

};