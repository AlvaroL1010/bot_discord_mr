const { Channel } = require('discord.js');

module.exports = {
    name: "Message Adder",

    execute(message){
        const fs = require('fs');
        const messages = require(`../Scores/${message.guild.id}.json`);

        /*if(message.guild.id in stats === false){
            stats[message.guild.id] = {};
        }
    
        const guildStats = stats[message.guild.id] = {};
        if(message.author.id in guildStats === false){
            stats[message.author.id] = {
                xp: 0,
                level: 0,
                last_message: 0
            };
        }
    
        const userStats = stats[message.author.id];
        userStats.xp += random.int(1,5);
    
        const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
        if(userStats.xp >= xpToNextLevel){
            userStats.level++;
            userStats.xp = userStats.xp - xpToNextLevel;
        }
    
        console.log(`${message.author.username} tiene ${userStats.xp} puntos de exp`);*/

        if(!messages[message.author.id]){
            messages[message.author.id] = {
                xp: 0,
                ping: message.author.toString(),
                level: 0,
                messages: 0,
                last_message: 0
            }
        }
        
        if(Date.now() - messages[message.author.id].last_message > 60000){
            messages[message.author.id].xp += 5;
            messages[message.author.id].last_message = Date.now();
            message.client.commands.get('checkexp').execute(message, message.author);          
        }

        messages[message.author.id] = {
            xp: messages[message.author.id].xp,
            ping: message.author.toString(),
            level: messages[message.author.id].level,
            messages: parseFloat(messages[message.author.id].messages) + 1,
            last_message: messages[message.author.id].last_message
        }

        fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify(messages), err => {
            if(err){
                console.log(err);
                message.channel.send(err);
            }
        });
    }
}