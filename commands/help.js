const { Command } = require("wolf.js");
const { api } = require("../bot");

const COMMAND_TRIGGER = "command_help";

Help = async (api, command) => {
  const phrase = api.phrase().getByCommandAndName(command, "message_help");
  return await api.messaging().sendMessage(command, phrase.join("\n"));
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Help(api, command),
});
