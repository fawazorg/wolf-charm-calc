import { getSummary } from "../charms/tip.js";
/**
 * Summary command handler
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (command) => {
  const text = await getSummary(command.targetChannelId, command.language);

  return command.reply(text);
};
