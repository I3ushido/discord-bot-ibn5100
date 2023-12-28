const getAllFiles = require("./getAllFiles");
const path = require("path");

module.exports = (exceptions = []) => {
  let localCommands = [];
  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandsFiles = getAllFiles(commandCategory);
    for (const commandsFile of commandsFiles) {
      const commandObject = require(commandsFile);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }
      console.log(`✅Load: ${commandObject.name}`);
      localCommands.push(commandObject);
    }
  }

  return localCommands;
};
