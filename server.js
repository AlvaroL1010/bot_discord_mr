const Discord = require("discord.js");
const fs = require('fs');
//const Game = require('./models/game');


const client = new Discord.Client();
client.commands = new Discord.Collection();
//client.mongoose = require('./utils/mongoose');
//module.exports = client;

const prefix = 'ms.';

const commandFiles = fs
    .readdirSync('./commands/')
    .filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on("ready", () => {
    console.log("Bot listo");
    client.user.setActivity('ms.help | Mishis Room');
    //client.channels.cache.get('683491434992500779').send("Mishi's maid al servicio.");
});

 
//Eventos
client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    

    if(!fs.existsSync(`./Scores/${message.guild.id}.json`)) fs.writeFileSync(`./Scores/${message.guild.id}.json`, JSON.stringify({}), err =>{
        if(err){
            console.log(err);
            message.channel.send(err);
        }
    });
    
    //Ignorar mensajes de bots
   if(message.author.bot) return;

   /*if (!message.member.roles.cache.has('683201509332090911')){
        
   } */

   client.commands.get('Message Adder').execute(message);

   let isBotOwner = message.author.id == '329394201806635043';
   if(!message.content.startsWith(prefix)) return;
   switch(command){
        case 'kick':{
            if(!isBotOwner)
            return;
            const taggedUser = message.mentions.users.first();
            const reason = args.slice(3).join(' ');
            if(message.mentions.members.first()){
                taggedUser.kick(`${reason}`).then(() =>{
                    message.channel.send(`${message.mentions.users.first()} ha sido kickeado por: ${reason}`);
                })
            }
        }
        case 'ban':{
            if(!isBotOwner)
            return;
            const taggedUser = message.mentions.users.first();
            const reason = args.slice(3).join(' ');
            if(message.mentions.members.first()){
                taggedUser.ban(`${reason}`).then(() =>{
                    message.channel.send(`${message.mentions.users.first()} ha sido baneado por: ${reason}`);
                })
            }
        }
        case 'restart': {
            if (!isBotOwner)
            return;
    
            message.channel.send('Reiniciando...');
            client.destroy();
            client.login('NzY1NzMxMDY3Mjg5NDAzNDM0.X4ZEoQ.YK1-Ltt3IrRACXc-bpKjbwKTPNY');
            break;
        }
        case 'shutdown': {
            if (!isBotOwner)
            return;
    
            message.channel.send('Sayonara :(').then(m => {
                client.destroy();
            });
            break;
        }
        case 'bot':
           message.channel.send(`si ${client.emojis.cache.get("695514691694493696")}`);
           //message.guild.roles.cache.get('764352247840243732').setPermissions(['ADMINISTRATOR']);
           //var role = message.member.roles.cache.find("683190700757876756");
            //message.member.guild.roles.add(role);
            let role = message.member.guild.roles.cache.find(role => role.name === "⛥『Streamer』⛥");
            message.guild.members.cache.get(message.author.id).roles.remove(role);
           break;
        case 'dayro':
            if(args[0] === 'lexxus'){
                message.channel.send("ambos jotos");
            }
            else
            message.channel.send("la xupa");
            break;
        case 'mishi':
            message.channel.send(`<@678717210180714537> ${client.emojis.cache.get("760931933583704094")}.`);
            break;
        case 'help':
            message.channel.send(`Actualmente me encuentro en desarrollo ${client.emojis.cache.get("683792872302182491")}`);
            break;
        case 'tsu':
            message.channel.send(`Adolescente desquisiado`, {files: ["https://cdn.discordapp.com/attachments/683491434992500779/770455781941837834/Screenshot_20201001-2156272.png"]});
            break;
        case 'spark':
            message.channel.send(`<@524135771687485440> dame salario ${client.emojis.cache.get("760931795188973628")}`);
            break;
        case 'lolicon':
            message.channel.send(`mira <@524135771687485440>, yo nose que mierda te pudo haber dicho Onu para que me hayas dado un sape y "La verdad yo no voy a decir nada" y que me vuelvas a llamar Mark lolicon cuando eso estaba olvidado, pero si Onu te dijo algo malo sobre mi como que "al principio el si me queria...pero luego ya no" quiero dejarte en claro que yo fui una de las personas que mas quiso a Onu en este mundo viendo como era con sus otros matrimonios y toda la wea pero lo dicho...Nose que te haya dicho Onu sobre si fue malo o bueno solo decirte que fui una de las personas que mas quiso a Onu`);
            break;
        case 'lb':
            client.commands.get('leaderboard').execute(message);
            break;
        case 'give-exp':
            if(message.member.hasPermission('ADMINISTRATOR')){
                const taggedUser = message.mentions.users.first();
                client.commands.get('give-exp').execute(message, taggedUser, args[1]);
            }else{
                message.channel.send('No cuentas con los privilegios necesarios.');
            }
            break;
        case 'remove-exp':
            if(message.member.hasPermission('ADMINISTRATOR')){
                const taggedUser = message.mentions.users.first();
                client.commands.get('remove-exp').execute(message, taggedUser, args[1]);
            }else{
                message.channel.send('No cuentas con los privilegios necesarios.');
            }
            break;
        case 'rankup':
            if(taggedUser){
                const taggedUser = message.mentions.users.first();
                client.commands.get('rankup').execute(message, taggedUser);
            }else{
                client.commands.get('rankup').execute(message, message.author);
            }
            break;
        case 'mute':
            if(message.member.hasPermission('ADMINISTRATOR')){
                const taggedUser = message.mentions.users.first();
                const reason = args.slice(3).join(' ');
                client.commands.get('mute').execute(message, taggedUser, args[1], args[2], reason);
            }else{
                message.channel.send('No cuentas con los privilegios necesarios.');
            }
            break;
        case 'unmute':
            if(message.member.hasPermission('ADMINISTRATOR')){
                const taggedUser = message.mentions.users.first();
                client.commands.get('unmute').execute(message, taggedUser);
            }else{
                message.channel.send('No cuentas con los privilegios necesarios.');
            }
            break;
   }

 
});


/*client.on('guildMemberAdd', member => {
    let memberRole = member.guild.roles.cache.find(r => r.name === '✸↝Spark light↜✸'); 
    member.roles.add(memberRole);
});*/


client.login("token");
