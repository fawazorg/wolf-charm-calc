import { Validator } from "wolf.js";
import { isValidPercentage } from "../charms/validate.js";
/**
 * Percentage command handler
 * @param {import('wolf.js').WOLF} client - The WOLF client instance.
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (client, command) => {
  const args = command.argument.split(/\s+/);
  if (args.length < 2) {
    return command.reply(command.getPhrase("message_error_percentage_args"));
  }

  const percentage = isValidPercentage(args[0]);
  if (percentage === false) {
    return command.reply(command.getPhrase("message_error_percentage_invalid"));
  }

  const secondNum = client.utility.number.toEnglishNumbers(args[1]);
  if (!Validator.isValidNumber(secondNum) || parseInt(secondNum) % 25 !== 0) {
    return command.reply(command.getPhrase("message_error_number_must_be_multiples_25"));
  }

  const result = (parseInt(secondNum) * percentage) / 100;
  return command.reply(
    client.utility.string.replace(command.getPhrase("message_percentage"), {
      result: client.utility.number.addCommas(result),
    }),
  );
};
