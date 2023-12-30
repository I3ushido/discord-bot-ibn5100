const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
require("dotenv").config();

const removeCommands = [];
const commands = [
  {
    name: "hey",
    description: "Replies with Hey!",
  },
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "first-number",
        description: "The first number",
        type: ApplicationCommandOptionType.Number,
        required: true,
        choices: [
          { name: "1", value: 1 },
          { name: "2", value: 2 },
          { name: "3", value: 3 },
          { name: "4", value: 4 },
          { name: "5", value: 5 },
        ],
      },
      {
        name: "second-number",
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "Replies with an embed",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: removeCommands }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
