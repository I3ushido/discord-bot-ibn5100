const { testServer, dev } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`⚙️ Command ${name} deleted`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`⚙️ Command ${name} edited`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(`⚙️ Command ${name} not found`);
          continue;
        }
        await applicationCommands.create({
          name,
          description,
          options,
        });
        console.log(`🌱 Command ${name} created`);
      }
    }
  } catch (error) {
    console.log(`There was an error ${error}`);
  }
};
