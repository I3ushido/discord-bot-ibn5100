require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

module.exports = {
  ROLES: {
    ADMIN: "405396099524984843",
    ADMIN_DEV: "1189546356457611274",
  },
  STATUS: [
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
    {
      name: "Older",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=r1Fx0tqK5Z4",
    },
    {
      name: "ハレハレヤ",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=eg65SbqmT0s",
    },
    {
      name: "Change My Clothes",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=kxWUcCUfDuE",
    },
    {
      name: "double take",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=uQiF1yOnzDg",
    },
    {
      name: "drunk text ",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=OqEc_169ywY",
    },
  ],
};
