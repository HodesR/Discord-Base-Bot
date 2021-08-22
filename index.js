const Discord = require("discord.js");
const config = require('./config.json')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { readdirSync } = require("fs")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
require('dotenv').config();
const fs = require("fs")
client.login(process.env.TOKEN);


client.on('ready', () => {
    console.log(`Le Bot est ON`)
    client.user.setStatus('idle'); //dnd, invisible, online, idle
    
});

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.on('message', message => {
 
  const args = message.content.trim().split(/ +/g)
  const commandName = args.shift().toLowerCase()
  if (!commandName.startsWith(config.prefix)) return
  const command = client.commands.get(commandName.slice(config.prefix.length))
  if (!command) return
  if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
  command.run(client, message, args)
});
