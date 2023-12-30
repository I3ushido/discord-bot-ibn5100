module.exports = {
  name: "ping",
  description: "Replies with the ping!",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Array,
  // deleted: true,
  callback: async (client, interaction) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(
      `🌐  Ping Latency: Client ${ping} ms | Websocket API Latency: ${client.ws.ping} ms`
    );
  },
};
