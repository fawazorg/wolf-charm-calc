const { Command } = require("wolf.js");
const { api } = require("../bot");
const { is25Multiples } = require("../charms/validate");

const COMMAND_TRIGGER = "command_point";

Point = async (api, command) => {
  const points = is25Multiples(command.argument);
  if (!points) {
    const phrase = api
      .phrase()
      .getByCommandAndName(
        command,
        "message_error_number_must_be_multiples_25"
      );
    return await api.messaging().sendMessage(command, phrase);
  }
  const phrase = api.phrase().getByCommandAndName(command, "message_point");
  const text = api.utility().string().replace(phrase, { charms: points });
  return await api.messaging().sendMessage(command, text);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Point(api, command),
});
