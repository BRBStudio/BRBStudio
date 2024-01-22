const { Client, EmbedBuilder, GatewayIntentBits, invites} = require("discord.js");
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] | [GatewayIntentBits.GuildMembers] | [GatewayIntentBits.MessageContent] | [GatewayIntentBits.GuildMessages]
});

      client.config = require('../../config.json');

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const { user, guild } = member;
    const welcomeChannel = member.guild.channels.cache.get(client.config.welcomeChannelId);
    if (!welcomeChannel) return;
    const ruleChannel = member.guild.channels.cache.get(client.config.ruleChannelId);
    const welcomeMessage = `${user.username} vừa tham gia ${guild.name}. \nBạn là thành viên thứ ${guild.memberCount}. \n\nVui lòng đọc kỹ thông tin tại đây ${ruleChannel}. Xin cảm ơn!`;
    client.config = require('../../config.json');

    const welcomeEmbed = new EmbedBuilder()
      .setTitle(`Chào mừng ${user.username} đến với BRB STUDIO 🎉 !!!`)
      .setDescription(welcomeMessage)
      .setColor('Green')
      .setThumbnail(user.displayAvatarURL())
      .setImage('https://media.giphy.com/media/q8btWot24CHVWJc7D2/giphy.gif')
      .addFields({
        name: "Tổng Số Thành Viên:",
        value: `${guild.memberCount}`
      })
      .setTimestamp();
    welcomeChannel.send({ content: `Xin chào thành viên mới ${user}`, embeds: [welcomeEmbed] });
  }
}