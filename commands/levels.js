import { readFile } from "fs/promises";

const imagePath = new URL("../charms/data/levels.jpeg", import.meta.url);

/**
 * Levels command - sends the levels image
 * @param {import('wolf.js').CommandContext} command - The incoming command context.
 * @returns {Promise<void>}
 */
export default async (command) => {
  const image = await readFile(imagePath);
  return command.reply(image);
};
