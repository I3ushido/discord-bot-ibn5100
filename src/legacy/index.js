require("dotenv").config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

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

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online 🟢`);
  setInterval(() => {
    const randomStatus = STATUS[Math.floor(Math.random() * STATUS.length)];
    client.user.setActivity(randomStatus);
  }, 1_000 * 60);
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
    if (!interaction.isChatInputCommand()) {
      console.log("Not a command");
    }

    if (interaction.commandName === "hey") {
      interaction.reply("Hey!");
    }

    // Add number!
    if (interaction.commandName === "add") {
      const firstNumber = interaction.options.get("first-number")?.value;
      const secondNumber = interaction.options.get("second-number")?.value;
      console.log(firstNumber, secondNumber);
      interaction.reply(`The sum is ${firstNumber + secondNumber}`);
    }

    if (interaction.commandName === "embed") {
      const embed = {
        title: "Hello World!",
        description: "This is an embed!",
        color: 0x00ff00,
      };
      interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error(error);
  }

  // Manage Roles
  try {
    if (!interaction.isButton()) {
      console.error("Not a button");
    }
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
