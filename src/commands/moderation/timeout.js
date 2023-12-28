const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "timeout",
  description: "Timeout a member",
  options: [
    {
      name: "target-user",
      description: "The user to timeout",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "duration",
      description: "Timeout duration (30m, 1h, 1day)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "reason",
      description: "The reason for the timeout!",
      type: ApplicationCommandOptionType.String,
    },
  ],

  permissionRequired: [PermissionFlagsBits.MuteMembers],
  botPermission: [PermissionFlagsBits.MuteMembers],

  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const duration = interaction.options.get("duration").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided!";

    await interaction.deferReply();
    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("User not found!");
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply("You cannot timeout a bot!");
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply("Invalid duration!");
      return;
    }
    if (msDuration < 5_000 || msDuration > 2.419e9) {
      await interaction.editReply(
        "Invalid duration: Timeout duration cannot be less than 5s or more that 28 days!"
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply("You cannot timeout this user!");
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("I cannot timeout this user!");
      return;
    }

    try {
      const { default: prettyMs } = await import("pretty-ms");

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply(
          `${targetUser}'s timeout has been updated to ${prettyMs(duration, {
            verbose: true,
          })}\nReason: ${reason}`
        );
        return;
      }
      await targetUser.timeout(msDuration, reason);
      await interaction.editReply(
        `${targetUser} was timed out for ${prettyMs(duration, {
          verbose: true,
        })}\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error when timing outs ${error}`);
    }
  },
};
