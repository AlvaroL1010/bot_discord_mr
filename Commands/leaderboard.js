module.exports = {
    name: "leaderboard",

    execute(message){
        const Discord = require('discord.js');
        const messages = require(`..//Scores/${message.guild.id}.json`);

        var messagesArray = Object.entries(messages)
        .map(v => `${v[1].level} - ${v[1].ping} - ${v[1].xp} - ${v[1].messages}`)
        .sort((a, b) => b.split(" - ")[0] - a.split(" - ")[0]);

        const embed = new Discord.MessageEmbed()
        .setTitle('Leaderboard')
        .setDescription('Top usuarios')
        .setAuthor(message.member.displayName)
        .setColor('BLURPLE')
        .addField('Nivel - Usuario - Exp - Mensajes: ', messagesArray)
        .setTimestamp()
        .setThumbnail(message.author.avatarURL())
        .setFooter('Mishi`s Room');

        message.delete();
        message.reply(embed);
    }
}