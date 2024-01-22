
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType, User, TeamMember, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Tạo một cuộc thăm dò và gửi nó đến một kênh nhất định")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Mô tả cuộc thăm dò ý kiến.")
                .setRequired(true)
                .setMinLength(1)                  //// nhập 1 kí tự 
                .setMaxLength(5000)               //// cho đến 5000 kí tự

        )
        .addChannelOption(option =>                                                    /////  thêm chỗ viết nơi chỉ định kênh cần đăng
            option.setName("channel")
                .setDescription("Bạn muốn gửi cuộc thăm dò ý kiến ​​tới đâu?")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),
        
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("channel");
        const description = options.getString("description");
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(description)
            .setAuthor({ name: 'BRB Studio Valheim Suggestion' , iconURL: 'https://i.imgur.com/coUpySu.jpg', url: 'https://discord.gg/Jc3QuUEnnd' })
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setFooter({ text: `${user.username}` , iconURL: `${user.displayAvatarURL()}` })
            .setTimestamp();
            

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("✅");
            await m.react("❎");
            await interaction.reply({ content: "Cuộc thăm dò đã được gửi thành công tới kênh.", ephemeral: true });
        } catch (err) {
            console.log("lỗi gửi thông báo từ chối chưa được xử lý tới hội nhà phát triển", err); 
        }
    }
};
