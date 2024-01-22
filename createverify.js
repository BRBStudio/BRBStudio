const { EmbedBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xácminh')
        .setDescription('đặt kênh xác minh của bạn')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Gửi xác minh tài khoản đến kênh này')
                .setRequired(true)
                
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
            .setTitle("Kích Hoạt Thành Viên")
            .setDescription('Click vào nút để xác minh tài khoản của bạn và đồng ý tuân thủ quy định server để có quyền truy cập vào các kênh.')
            .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify')
                                       .setLabel('Tôi đồng ý và chấp hành quy định luật')
                                       .setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!sendChannel) {
            return interaction.reply({ content: 'Đã có lỗi xảy ra, vui lòng thử lại sau.', ephemeral: true });
        } else {
            return interaction.reply({ content: 'Kênh xác minh đã được thiết lập thành công!', ephemeral: true });
        }
    },
};