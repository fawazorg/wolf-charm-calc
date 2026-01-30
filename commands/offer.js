import { all, get } from "../charms/offer.js";
import { isNumber } from "../charms/validate.js";
/**
 * Offers command handler
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (command) => {
  const language = command.language === "ar" ? 14 : 1;
  if (command.argument.length < 1) {
    const offers = await all(language, 6);
    return await command.reply(offers);
  }
  const index = isNumber(command.argument);
  if (!index) {
    return await command.reply(command.getPhrase("message_error_not_number"));
  }
  try {
    let { text, options } = await get(index, language, 6);
    await command.reply(text, options);
  } catch {
    return await command.reply(command.getPhrase("message_error_offer_notfound"));
  }
};
