const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "CHARM",
    translations: {
      //"en-US": "!tv find",
      "ar-SA": "!تشارمز تكلفة",
      "ar-SA-1": "!تشارم تكلفة",
      "ar-SA-2": "!تشارم ت",
    },
  },
];
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Charm = async (bot, context) => {
  let num = parseInt(a2e(context.Rest));
  if (isNaN(num)) {
    await context.Reply("(n) فقط الارقام مسموح بها.");
    return;
  }
  if (num <= 0) {
    await context.Reply("(n) لا يمكن حساب ارقام اقل من 0.");
    return;
  }
  let post_fix = "القيمة :";
  let pre_fix = "نقطة";
  await context.Reply(`/me ${post_fix} ${num * 25} ${pre_fix}`);
};

/**
 *
 */
const Commands = [
  new Command("CHARM", {
    method: (null, Charm),
  }),
];

module.exports = {
  Commands,
  Translation,
};
