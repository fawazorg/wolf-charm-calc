const { Command, CommandContext } = require("@wolf.jet/framework");

const Translation = [
  {
    key: "CHARM",
    translations: {
      "ar-SA": "!تشارمز قيمة",
      "ar-SA-1": "!تشارم قيمة",
      "ar-SA-2": "!تشارم ق",
    },
  },
];
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
const formatNumber = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

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
  await context.Reply(`/me ${post_fix} ${formatNumber(num * 25)} ${pre_fix}`);
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
