const { Command } = require("wolf.js");
const { api } = require("../bot");
const { getSummary } = require("../charms/tip");

const COMMAND_TRIGGER = "command_summary";

Summary = async (api, command) => {
  const text = await getSummary(command.targetGroupId, command.language);
  return api.messaging().sendGroupMessage(command.targetGroupId, text);
};

module.exports = new Command(COMMAND_TRIGGER, {
  group: (command) => Summary(api, command),
});
