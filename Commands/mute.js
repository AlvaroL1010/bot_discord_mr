module.exports = {
    name: 'mute',
    
    execute(message, user, ntime, ttime, reason){
        if (!user){
            return message.channel.send(`${messsage.author.toString()}, debes mencionar a alguien.`);
        }
        let mention = message.guild.members.cache.get(user.id);
        let mutedRole = message.guild.roles.cache.get('689737331090915358');
        mention.roles.add(mutedRole);
        if(!ntime){
            setTimeout(() => {
                message.client.commands.get('unmute').execute(message, user);
            }, 900000);
        message.channel.send(`${message.author.toString()} ha muteado a ${user.toString()} por 15 minutos.`);
        }
        if(!reason){
            reason = "Desconocido";
        }
        if(ttime === 's' ){
            setTimeout(() => {
                    message.client.commands.get('unmute').execute(message, user);
                }, ntime * 1000);
            message.channel.send(`${message.author.toString()} ha muteado a ${user.toString()} por ${ntime} segundos.\nRazon: ${reason}\nPortate bien.`); 
        }
        if(ttime === 'm'){
            setTimeout(() => {
                    message.client.commands.get('unmute').execute(message, user);
                }, ntime * 60000);
            message.channel.send(`${message.author.toString()} ha muteado a ${user.toString()} por ${ntime} minutos.\nRazon: ${reason}\nPortate bien.`); 
        }
        if(ttime === 'h'){
            setTimeout(() => {
                    message.client.commands.get('unmute').execute(message, user);
                }, ntime * 3600000);
            message.channel.send(`${message.author.toString()} ha muteado a ${user.toString()} por ${ntime} horas.\nRazon: ${reason}\nPortate bien.`); 
        }
        if(ttime === 'd'){
            setTimeout(() => {
                message.client.commands.get('unmute').execute(message, user);
                }, ntime * 86400000);
            message.channel.send(`${message.author.toString()} ha muteado a ${user.toString()} por ${ntime} días.\nRazon: ${reason}\nPortate bien.`); 
        }
    }
}