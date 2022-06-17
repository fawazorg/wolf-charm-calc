const { Command, CommandContext } = require("@wolf.jet/framework");
const path = require("path");
const Translation = [
  {
    key: "PRICES",
    translations: {
      "ar-SA": "!تشارمز اسعار",
      "ar-SA-1": "!تشارم اسعار",
    },
  },
];

const Prices = async (bot, context) => {
  await context.ReplyImage(path.resolve("src/data/charms.jpeg"));
};

/**
 *
 */
const Commands = [
  new Command("PRICES", {
    method: (null, Prices),
  }),
];

module.exports = {
  Commands,
  Translation,
};
