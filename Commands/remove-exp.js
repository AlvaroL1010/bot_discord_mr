module.exports = {
    name: "remove-exp",

    execute(message, mention, amount){
        const fs = require('fs');
        const Discord = require('discord.js');
        const messages = require(`../Scores/${message.guild.id}.json`);

        messages[mention.id].xp = parseInt(messages[mention.id].xp) - parseInt(amount);
        if(messages[mention.id].xp < 0){
            messages[mention.id].xp = 0;
        }
        message.channel.send(`${message.author.toString()} le ha confiscado ${amount} puntos de experiencia a ${mention.toString()}.`);

        fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify(messages), err => {
            if(err){
                console.log(err);
                message.channel.send(err);
            }
        });
    }
}