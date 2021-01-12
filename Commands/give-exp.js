module.exports = {
    name: "give-exp",

    execute(message, mention, amount){
        const fs = require('fs');
        const Discord = require('discord.js');
        const messages = require(`../Scores/${message.guild.id}.json`);

        messages[mention.id].xp = parseInt(messages[mention.id].xp) + parseInt(amount);
        message.channel.send(`${message.author.toString()} le ha otorgado ${amount} puntos de experiencia a ${mention.toString()}.`);
        message.client.commands.get('checkexp').execute(message, mention);  

        fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify(messages), err => {
            if(err){
                console.log(err);
                message.channel.send(err);
            }
        });
    }
}