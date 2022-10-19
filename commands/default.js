const { Command } = require("wolf.js");
const { api } = require("../bot");
const COMMAND_TRIGGER = "command_default";

Default = async (api, command) => {
  const phrase = api.phrase().getByCommandAndName(command, "message_default");
  return await api.messaging().sendMessage(command, phrase);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Default(api, command),
});
