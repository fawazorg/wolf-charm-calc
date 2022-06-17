const { Command, CommandContext } = require("@wolf.jet/framework");
const path = require("path");
const Translation = [
  {
    key: "LEVELS",
    translations: {
      "ar-SA": "!تشارمز مستوى",
      "ar-SA-1": "!تشارم مستوى",
    },
  },
];

const Levels = async (bot, context) => {
  await context.ReplyImage(path.resolve("src/data/levels.jpeg"));
};

/**
 *
 */
const Commands = [
  new Command("LEVELS", {
    method: (null, Levels),
  }),
];

module.exports = {
  Commands,
  Translation,
};
