const { Command } = require("wolf.js");
const { api } = require("../bot");
const fs = require("fs");
const path = require("path");

const COMMAND_TRIGGER = "command_prices";

Prices = async (api, command) => {
  let image = await fs.readFileSync(
    path.join(__dirname, "../charms/data/charms.jpeg")
  );
  return await api.messaging().sendMessage(command, image);
};

module.exports = new Command(COMMAND_TRIGGER, {
  both: (command) => Prices(api, command),
});
