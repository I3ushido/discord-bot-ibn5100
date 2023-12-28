const {
  Client,
  interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // deleted: true,
  name: "ban",
  description: "Bans a member from the server!!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  options: [
    {
      name: "target-user",
      description: "The user to ban.",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "The reason for the banning",
      type: ApplicationCommandOptionType.String,
    },
  ],

  permissionRequired: [PermissionFlagsBits.BanMembers],
  botPermission: [PermissionFlagsBits.BanMembers],

  /**
   *
   * @param {Client} client
   * @param {interaction} interaction
   */
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided!";
    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);
    if (!targetUser) {
      await interaction.editReply("User not found!");
    }
    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You cannot ban the owner!");
      return;
    }
    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply("You cannot ban this user!");
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("I cannot ban this user!");
      return;
    }

    try {
      await targetUser.ban({ reason });
      await interaction.editReply(`Banned ${targetUser}!\nReason: ${reason}`);
    } catch (error) {
      console.log(`There was an error when banning ${error}`);
    }
  },
};
