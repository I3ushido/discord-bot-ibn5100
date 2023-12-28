require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const ROLES = {
  ADMIN: "<@&1189546356457611274>",
};

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online 🟢`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "embed") {
    const embed = {
      title: "Hello World!",
      description: "This is an embed!",
      color: 0x00ff00,
    };
    message.channel.send({ embeds: [embed] });
  }

  // Check someone tag @admin
  const messageWords = message.content.split(" ");
  const isAdminMessage = messageWords.some((word) =>
    word.includes(ROLES.ADMIN)
  );
  if (isAdminMessage) {
    message.reply("No one wanna play with you 😂");
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction
      .deferReply({ ephemeral: true })
      .then(console.log)
      .catch(console.error);
    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "Role not found",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`You have removed the role ${role}`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`You have claimed the role ${role}`);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
