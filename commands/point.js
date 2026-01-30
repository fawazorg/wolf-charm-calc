import { is25Multiples } from "../charms/validate.js";
/**
 * Point command handler
 * @param {import('wolf.js').WOLF} client - The WOLF client instance.
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (client, command) => {
  const points = is25Multiples(command.argument);
  if (!points) {
    return command.reply(command.getPhrase("message_error_number_must_be_multiples_25"));
  }

  return command.reply(
    client.utility.string.replace(command.getPhrase("message_point"), { charms: points }),
  );
};
