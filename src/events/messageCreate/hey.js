const { Client, Message } = require("discord.js");
const { ROLES } = require("../../helper/constance");

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */
module.exports = async (client, message, interaction) => {
  if (!message.inGuild() || message.author.bot) return;

  if (message.content.toLowerCase() === "-list") {
    try {
      const list = client.channels.cache.get("1190037320632647780").members;
      console.log(list);
    } catch (error) {
      console.log(error);
    }
  }

  // Check someone tag @admin
  const messageWords = message.content.split(" ");
  const isAdminMessage = messageWords.some((word) =>
    word.includes(ROLES.ADMIN)
  );
  if (isAdminMessage) {
    const embed = {
      title: "What are you doing here?",
      description: "No one wanna play with you 🤣",
      color: 0x7289da,
      Image: {
        url: "https://media.tenor.com/HseHXaJz2OAAAAAM/sad-cry.gif",
      },
    };
    message.reply({ embeds: [embed] });
  }
};
