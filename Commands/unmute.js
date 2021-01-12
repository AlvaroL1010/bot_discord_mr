module.exports = {
    name: 'unmute',

    execute(message, user){
        if (!user){
            return message.channel.send(`${message.author.toString()}, debes mencionar a alguien.`);
        }
        let mention = message.guild.members.cache.get(user.id);
        let mutedRole = message.guild.roles.cache.get('689737331090915358');
        if(!mention.roles.cache.has(mutedRole)){
            mention.roles.remove(mutedRole);
            message.channel.send(`${user.toString()} ya puedes volver a hablar, portate bien la proxima.`);
        }else{
            message.channel.send(`${user.toString()} no esta muteado.`);
        }
    }
}