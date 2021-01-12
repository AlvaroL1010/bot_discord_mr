module.exports = {
    name: "checkexp",

    execute(message, user){
        const fs = require('fs');
        const Discord = require('discord.js');
        const messages = require(`../Scores/${message.guild.id}.json`);
        

        const xpToNextLevel = 5 * Math.pow(messages[user.id].level, 2) + 50 * messages[user.id].level + 100;
            const lvl1 = 1; 
            const lvl2 = 2;
            const lvl3 = 3; 
            const lvl4 = 4;
            const lvl5 = 5; 
            const lvl6 = 6;
            const lvl7 = 7; 
            const lvl8 = 8;
            const lvl9 = 9; 
            const lvl10 = 10;
            if(messages[user.id].xp >= xpToNextLevel){
                messages[user.id].level++;
                messages[user.id].xp = messages[user.id].xp - xpToNextLevel;
                let lvlchannel = message.guild.channels.cache.get('769394230593323080');
                if(lvlchannel){
                    lvlchannel.send(`Eu ${user.toString()}, si vos ${message.client.emojis.cache.get('760931933583704094')} has alcanzado el nivel ${messages[user.id].level}, felicidades mi rey ${message.client.emojis.cache.get('695514691694493696')}`);
                }
                if(messages[user.id].level === lvl1){
                    message.member.roles.add('766756495152906310');
                }
                if(messages[user.id].level === lvl2){
                    message.member.roles.add('766756604510339183');
                }
                if(messages[user.id].level === lvl3){
                    message.member.roles.add('766756700325150732');
                }
                if(messages[user.id].level === lvl4){
                    message.member.roles.add('766756815530491907');
                }
                if(messages[user.id].level === lvl5){
                    message.member.roles.add('766756974317666306');
                }
                if(messages[user.id].level === lvl6){
                    message.member.roles.add('766758295100719155');
                }
                if(messages[user.id].level === lvl7){
                    message.member.roles.add('766758512008495106');
                }
                if(messages[user.id].level === lvl8){
                    message.member.roles.add('766758592971276288');
                }
                if(messages[user.id].level === lvl9){
                    message.member.roles.add('766758690543108136');
                }
                if(messages[user.id].level === lvl10){
                    message.member.roles.add('766758761439297556');
                }
            }

        fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify(messages), err => {
            if(err){
                console.log(err);
                message.channel.send(err);
            }
        });
    }
}