module.exports = {
    name: "rankup",

    execute(message, user){
        const fs = require('fs');
        const Discord = require('discord.js');
        const messages = require(`../Scores/${message.guild.id}.json`);

        const remainexp = (5 * Math.pow((messages[user.id].level), 2) + 50 * (messages[user.id].level) + 100) - messages[user.id].xp;
        message.channel.send(`${user.toString()}, te faltan ${remainexp} puntos de experiencia para subir a nivel ${messages[user.id].level + 1}.`);

        fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify(messages), err => {
            if(err){
                console.log(err);
                message.channel.send(err);
            }
        });
    }
}