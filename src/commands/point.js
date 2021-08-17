const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "POINT",
    translations: {
      //"en-US": "!tv find",
      "ar-SA": "!تشارمز نقطة",
      "ar-SA-1": "!تشارم نقطة",
      "ar-SA-2": "!تشارم ن",
    },
  },
];
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Point = async (bot, context) => {
  let num = parseInt(a2e(context.Rest));
  if (isNaN(num)) {
    await context.Reply("(n) فقط الارقام مسموح بها.");
    return;
  }
  if (num < 0) {
    await context.Reply("(n) فقط الارقام مسموح بها.");
    return;
  }
  if (num % 25 !== 0) {
    await context.Reply("(n) يجب أن يكون عدد النقاط من مضاعفات 25.");
    return;
  }
  let post_fix = "العدد :";
  let pre_fix = "تشارم";
  await context.Reply(`/me ${post_fix} ${Math.floor(num / 25)} ${pre_fix}`);
};

/**
 *
 */
const Commands = [
  new Command("POINT", {
    method: (null, Point),
  }),
];

module.exports = {
  Commands,
  Translation,
};
