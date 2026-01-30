/**
 * @file Entry point for the Wolf Charm Calculator bot.
 * Initializes the WOLF client, registers command handlers, and starts the login process.
 * @module index
 */

import "dotenv/config";
import { Command, OnlineState, WOLF } from "wolf.js";
import * as Charms from "./commands/index.js";

/** @type {import('wolf.js').WOLF} */
const client = new WOLF();

/**
 * Registers the command tree with channel handlers.
 * @description Command hierarchy:
 * - **default** - Fallback handler for unrecognized commands.
 *   - **help** - Displays the help message.
 *   - **levels** - Sends the charm levels image.
 *   - **offer** - Lists available offers or shows a specific offer.
 *   - **point** - Converts points to charms (multiples of 25).
 *   - **price** - Converts charms to points.
 *   - **prices** - Sends the charms pricing image.
 *   - **summary** - Displays the daily tipping summary.
 */
client.commandHandler.register([
  new Command("command_default", { channel: (command) => Charms.main(command) }, [
    /** Displays the help message. */
    new Command("command_help", { channel: (command) => Charms.help(command) }),
    /** Sends the charm levels image. */
    new Command("command_levels", { channel: (command) => Charms.levels(command) }),
    /** Lists available offers or shows a specific offer. */
    new Command("command_offer", { channel: (command) => Charms.offer(command) }),
    /** Converts points to charms (multiples of 25). */
    new Command("command_point", { channel: (command) => Charms.point(client, command) }),
    /** Converts charms to points. */
    new Command("command_price", { channel: (command) => Charms.price(client, command) }),
    /** Sends the charms pricing image. */
    new Command("command_prices", { channel: (command) => Charms.prices(command) }),
    /** Displays the daily tipping summary. */
    new Command("command_summary", { channel: (command) => Charms.summary(command) }),
  ]),
]);

export { client };

/**
 * Logs the bot's online status after a successful login.
 * @param {import('wolf.js').Subscriber} subscriber - The authenticated subscriber.
 */
client.on("loginSuccess", async (subscriber) => {
  console.log(`[*][${subscriber.nickname} (${subscriber.id})] is now online.`);
});

client.login(process.env.EMAIL, process.env.PASSWORD, undefined, OnlineState.ONLINE);
