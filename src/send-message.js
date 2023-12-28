require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1189546356457611274",
    label: "Admin",
  },
  {
    id: "1189629245358608464",
    label: "Member",
  },
];

client.on("ready", async (c) => {
  console.log(`${c.user.tag} is online 🟢`);

  try {
    const channel = client.channels.cache.get("1189407208564346900");
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Claim or Remove a roles below!",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.error(error);
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
});

client.login(process.env.TOKEN);
