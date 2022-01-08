//These constants declare that we need access to the Discord node_modules, and starts to create a new Bot.
const { doesNotThrow } = require('assert');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"]});

// This prefix constant controls the start-character for all commands of the bot.
const prefix = process.env.PREFIX;

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



//Code below is a log statement that lets you know when the bot has come online.
client.once('ready', () => {
    console.log(`No fight will keep me down. I, the ${client.user.tag}, am ready!`)
});


client.on('guildMemberAdd', guildMember =>
{
    // let welcomeRole = guildMember.guild.role.cache.find(role => role.name === 'DoorFrame');

    // guildMember.roles.add(welcomeRole);
    // guildMember.guild.channels.cache.get()

    const welcomeId = '929258954868023296'; //This ID value should be switched to whatever the welcome channelID is in the server.
    const welcomeMessage = `<@${guildMember.id}>, you're late! We've been waiting for you to join the Third Legion! Read the rules and get your roles set up, you've got training to do!`;
    guildMember.guild.channels.fetch(welcomeId).then(channel => {channel.send(welcomeMessage)});
});

/* 
    Command Handler for the entire bot. All coommands called below can be found
    within the command modules section.
*/

client.on('messageCreate', message => 
    {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'ping')
    {
        client.commands.get('ping').execute(message, args);
    }
});


client.login(process.env.DISCORD_TOKEN).then(() => {
    client.user.setPresence({ activities: [{ name: 'to "The Art of War" by Sun Tzu', type: 'LISTENING' }], status: 'online' });
});