const { Client, Message } = require("discord.js");
const { ROLES } = require("../../helper/constance");

/* Color
    #00ff00
    #7289da
    #43B581
    #FAA61A
    #F04747
    #747F8E
    #1e2124
    #593595
*/

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */
module.exports = async (client, message, interaction) => {
  if (!message.inGuild() || message.author.bot) return;

  // Check list member in channel list_member_channel_id
  if (message.content.toLowerCase() === "-list") {
    try {
      const list = client.channels.cache.get("1190468774369972284").members;
      console.log(list);
    } catch (error) {
      console.log(error);
    }
  }

  if (message.content.toLowerCase() === "-chipi") {
    message.reply("https://media1.tenor.com/m/Yfem5pfa7wIAAAAC/cat-car.gif");
  }

  // Check someone tag @admin
  const messageWords = message.content.split(" ");
  const isAdminMessage = messageWords.some((word) =>
    word.includes(ROLES.ADMIN)
  );
  if (isAdminMessage) {
    const embed = {
      title: "What are you doing here?",
      description: "No one wanna play with you ❗",
      color: 0xf04747,
      Image: {
        url: "https://media.tenor.com/HseHXaJz2OAAAAAM/sad-cry.gif",
      },
    };
    message.reply({ embeds: [embed] });
  }
};
