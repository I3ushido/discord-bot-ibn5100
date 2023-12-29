const {
  ApplicationCommandOptionType,
  Client,
  Interaction,
  AttachmentBuilder,
} = require("discord.js");
const Level = require("../../models/Level");
const canvacord = require("canvacord");
const calculateLevelXp = require("../../utils/calculateLevelXp");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild())
      return interaction.reply({
        content: "This command can only be used in a server!",
        ephemeral: true,
      });

    await interaction.deferReply();
    const mentionedUserId = interaction.options.get("target-user")?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId
          ? `${targetUserObj.user.tag} doesn't have any levels yet, Try again when they chat a little more!`
          : `You don't have any levels yet, Try again when you chat a little more!`
      );
      return;
    }

    let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
      "-_id userId level xp"
    );
    allLevels = allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });
    let currentRank =
      allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;
    const rank = new canvacord.Rank()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setStatus(targetUserObj.presence.status)
      .setProgressBar(["#000000", "#7289da"], "GRADIENT")
      .setUsername(targetUserObj.user.username)
      .setBackground("COLOR", "#1e2124")
      .setDiscriminator(targetUserObj.user.discriminator);

    const data = await rank.build();
    const attachment = new AttachmentBuilder(data);
    interaction.editReply({ files: [attachment] });
  },
  name: "level",
  description: "Shows your level",
  options: [
    {
      name: "target-user",
      description: "The user whose level you want to see!",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
