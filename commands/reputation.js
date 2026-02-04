import { is100Multiples } from "../charms/validate.js";
/**
 * Reputation command handler
 * @param {import('wolf.js').WOLF} client - The WOLF client instance.
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (client, command) => {
  const number = is100Multiples(command.argument);
  if (number === false) {
    return command.reply(command.getPhrase("message_error_reputation_invalid"));
  }

  const result = number * 0.0257;
  return command.reply(
    client.utility.string.replace(command.getPhrase("message_reputation"), { result: result }),
  );
};
