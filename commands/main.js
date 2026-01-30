/**
 * Main command
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (command) => {
  return command.reply(command.getPhrase("message_default"));
};
