import { isNumber } from "../charms/validate.js";
/**
 * Price command handler
 * @param {import('wolf.js').WOLF} client - The WOLF client instance.
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (client, command) => {
  const charms = isNumber(command.argument, true);
  if (!charms) {
    return command.reply(command.getPhrase("message_error_not_number"));
  }

  return command.reply(
    client.utility.string.replace(command.getPhrase("message_charms"), { points: charms }),
  );
};
