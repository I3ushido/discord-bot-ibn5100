require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

const steaming = ActivityType.Streaming;
const ROLES = {
  ADMIN: "405396099524984843",
  ADMIN_DEV: "1189546356457611274",
};

const STATUS = [
  createStreamingStatus(
    "Fireflies",
    "https://www.youtube.com/watch?v=psuRGfAaju4"
  ),
  createStreamingStatus(
    "Bad Moon",
    "https://www.youtube.com/watch?v=sZSdRVkplWQ"
  ),
  createStreamingStatus(
    "You Are The Reason",
    "https://www.youtube.com/watch?v=ShZ978fBl6Y"
  ),
  createStreamingStatus(
    "Umbrella",
    "https://www.youtube.com/watch?v=jUhMKjfc5yc"
  ),
  createStreamingStatus(
    "We Are Young",
    "https://www.youtube.com/watch?v=Sv6dMFF_yts"
  ),
  createStreamingStatus("Older", "https://www.youtube.com/watch?v=r1Fx0tqK5Z4"),
  createStreamingStatus(
    "ハレハレヤ",
    "https://www.youtube.com/watch?v=eg65SbqmT0s"
  ),
  createStreamingStatus(
    "Change My Clothes",
    "https://www.youtube.com/watch?v=kxWUcCUfDuE"
  ),
  createStreamingStatus(
    "double take",
    "https://www.youtube.com/watch?v=uQiF1yOnzDg"
  ),
  createStreamingStatus(
    "drunk text",
    "https://www.youtube.com/watch?v=OqEc_169ywY"
  ),
];

function createStreamingStatus(name, url) {
  return {
    name,
    type: steaming,
    url,
  };
}

module.exports = {
  ROLES,
  STATUS,
};
