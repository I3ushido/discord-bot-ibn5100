require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

module.exports = (client) => {
  const STATUS = [
    {
      name: "Fireflies",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=psuRGfAaju4",
    },
    {
      name: "Bad Moon",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=sZSdRVkplWQ",
    },
    {
      name: "You Are The Reason",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=ShZ978fBl6Y",
    },
    {
      name: "Umbrella",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=jUhMKjfc5yc",
    },
    {
      name: "We Are Young",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=Sv6dMFF_yts",
    },
  ];

  console.log(`🟢 ${client.user.tag} is online`);

  setInterval(() => {
    const randomStatus = STATUS[Math.floor(Math.random() * STATUS.length)];
    client.user.setActivity(randomStatus);
    console.log(`🎵 ${randomStatus.name}`);
  }, 1_000 * 60);
};
