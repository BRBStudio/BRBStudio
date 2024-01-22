const { Client, Events, GatewayIntentBits, ActivityType, Partials, Collection, EmbedBuilder } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] | [GatewayIntentBits.GuildMembers] | [GatewayIntentBits.MessageContent] | [GatewayIntentBits.GuildMessages] 
});

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');

const fs = require('node:fs');
const path = require('node:path');
const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles){
  const filePath = path.join(eventPath, file);
  const event = require(filePath);
  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.once(Events.ClientReady, c => {
    client.user.setPresence({
        status: 'online', 
        activities: [
            {
                name: '♥️ Valheim ♥️',
                type: ActivityType.Streaming
            },
        ], 
    });
});

client.commands = new Collection();
client.config = require('./config.json');

client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
