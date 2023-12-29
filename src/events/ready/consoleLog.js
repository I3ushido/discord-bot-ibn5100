require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");
const { STATUS } = require("../../helper/constance");

/**
 *
 * @param {Client} client
 */
module.exports = (client) => {
  console.log(`🟢 ${client.user.tag} is online`);

  setInterval(() => {
    const randomStatus = STATUS[Math.floor(Math.random() * STATUS.length)];
    client.user.setActivity(randomStatus);
    console.log(`🎵 ${randomStatus.name}`);
  }, 1_000 * 60);
};
