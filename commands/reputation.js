import { is100Multiples } from "../charms/validate.js";
/**
 * Reputation command handler
 * @param {import('wolf.js').WOLF} client - The WOLF client instance.
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (client, command) => {
  const subscriber = await command.subscriber();
  const userLevel = parseInt(subscriber.reputation.toString().split(".")[0]);
  if (userLevel < 18) {
    return command.reply(command.getPhrase("message_error_reputation_level_required"));
  }

  const number = is100Multiples(command.argument);
  if (number === false) {
    return command.reply(command.getPhrase("message_error_reputation_invalid"));
  }

  const result = ((number / 100) * 0.0257).toFixed(3);
  return command.reply(
    client.utility.string.replace(command.getPhrase("message_reputation"), { result: result }),
  );
};
