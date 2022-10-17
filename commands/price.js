const { Command } = require("wolf.js");
const { api } = require("../bot");
const { isNumber } = require("../charms/validate");
const COMMAND_TRIGGER = "command_price";

Price = async (api, command) => {
  const charms = isNumber(command.argument, true);
  if (!charms) {
    const phrase = api
      .phrase()
      .getByCommandAndName(command, "message_error_not_number");
    return await api.messaging().sendMessage(command, phrase);
  }
  const phrase = api.phrase().getByCommandAndName(command, "message_charms");
  const text = api.utility().string().replace(phrase, { points: charms });
  return await api.messaging().sendMessage(command, text);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Price(api, command),
});
