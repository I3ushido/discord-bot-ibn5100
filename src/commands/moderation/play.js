const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "play",
  description: "I want to play a game!",
  options: [
    {
      name: "target-game",
      description: "Games you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "Dota 2", value: "Dota 2" },
        { name: "CSGO 2", value: "CSGO 2" },
        { name: "The Final", value: "The Final" },
        { name: "Monster Hunter Rise", value: "Monster Hunter Rise" },
      ],
    },
    {
      name: "target-friends",
      description: "Call friends to play together!",
      required: false,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "Why do you want to play?",
      type: ApplicationCommandOptionType.String,
    },
  ],

  permissionRequired: [PermissionFlagsBits.Mentionable],
  botPermission: [PermissionFlagsBits.Mentionable],

  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const targetGameId = interaction.options.get("target-game").value;
    const targetFriendId = interaction.options.get("target-friends").value;
    const reason =
      interaction.options.get("reason")?.value || "Let's play together 🎮";

    await interaction.deferReply();
    const targetFriend = await interaction.guild.members.fetch(targetFriendId);
    console.log(targetFriend);
    console.log(targetFriendId);

    if (!targetFriend) {
      await interaction.editReply("User not found!");
      return;
    }

    if (targetFriend.user.bot) {
      await interaction.editReply("You cannot call a bot!");
      return;
    }

    if (targetFriendId === interaction.member.id) {
      await interaction.editReply("Why are you so rude??");
      return;
    }

    console.log(`_play: ${targetGameId}`);
    console.log(`_target-friends: ${targetFriendId}`);
    console.log(`_reason: ${targetGameId}`);

    try {
      console.log(`_play: ${targetGameId}`);
      console.log(`_target-friends: ${targetFriendId}`);
      console.log(`_reason: ${targetGameId}`);
      await interaction.editReply(
        `Game ${targetGameId}!\nCalling to <@&${targetFriendId}> \n${reason}`
      );
    } catch (error) {
      console.log(`There was an error when banning ${error}`);
    }
  },
};
