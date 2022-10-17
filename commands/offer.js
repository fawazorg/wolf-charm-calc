const { Command } = require("wolf.js");
const { api } = require("../bot");
const { all, get } = require("../charms/offer");
const { isNumber } = require("../charms/validate");

const COMMAND_TRIGGER = "command_offer";

Offer = async (api, command) => {
  const language = command.language === "ar" ? 14 : 1;
  if (command.argument.length < 1) {
    const offers = await all(language, 6);
    return await api.messaging().sendMessage(command, offers);
  }
  const index = isNumber(command.argument);
  if (!index) {
    const phrase = api
      .phrase()
      .getByCommandAndName(command, "message_error_not_number");
    return await api.messaging().sendMessage(command, phrase);
  }
  try {
    let { text, options } = await get(index, language, 6);
    await api.messaging().sendMessage(command, text, options);
  } catch (error) {
    const phrase = api
      .phrase()
      .getByCommandAndName(command, "message_error_offer_notfound");
    return await api.messaging().sendMessage(command, phrase);
  }
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Offer(api, command),
});
