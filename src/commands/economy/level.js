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
      .setRank(currentRank, "RANK")
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setStatus(targetUserObj.presence.status)
      .setProgressBar(["#000000", "#43B581"], "GRADIENT")
      .setUsername(targetUserObj.user.username)
      // .setBackground("COLOR", "#1e2124")
      .setBackground(
        "IMAGE",
        "https://cdn.discordapp.com/attachments/1189407208564346900/1190264098080968775/cover-rank.png?ex=65a12ad3&is=658eb5d3&hm=f7d9e746ab41bc6e17ef09be1868f17460d3e6cf91c965d91f714fa7d148131e&"
      )
      .setOverlay("#1e2124", 0, 0)
      .setLevelColor("#43B581", "#747F8E")
      .setRankColor("#43B581", "#747F8E");
    // .setDiscriminator(targetUserObj.user.discriminator);
    console.log(`target: ${JSON.stringify(targetUserObj.user, " ", 0)}`);
    /* Color
    #00ff00
    #7289da
    #43B581
    #FAA61A
    #F04747
    #747F8E
    #1e2124
    #593595
    */

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
