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
    const offers = await all(language, 10);
    return await command.reply(offers);
  }
  const index = isNumber(command.argument);
  if (!index) {
    return await command.reply(command.getPhrase("message_error_not_number"));
  }
  try {
    const text = await get(index, language, 10);
    await command.reply(text, {
      formatting: {
        includeEmbeds: false,
        renderLinks: true,
        renderAds: false
      }
    });
  } catch (error) {
    return await command.reply(command.getPhrase("message_error_offer_notfound"));
  }
};
