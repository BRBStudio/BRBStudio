const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds] | [GatewayIntentBits.GuildMembers] | [GatewayIntentBits.MessageContent] | [GatewayIntentBits.GuildMessages]
});

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                interaction.reply({ content: "Lệnh lỗi thời rồi nhé, hãy chờ ít phút và thử lại" });
            }

            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            client.commands = new Collection();
            client.config = require('../../config.json');

            const role = interaction.guild.roles.cache.get(client.config.verifyRoleId)

            return interaction.member.roles
                .add(role)
                .then((member) =>
                    interaction.reply({
                        content: `Đã kích hoạt ${role} cho tài khoản cho bạn.`,
                        ephemeral: true,
                    }),
                );
        } else {
            return;
        }
    },
};