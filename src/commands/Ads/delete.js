const { Command, CommandContext } = require("cmd.wolf.js");
const { Owner, PrivateFilter } = require("../filters");
const ads = require("../../data/ads");
const Translation = [
  {
    key: "ADSDELETE",
    translations: {
      "ar-SA": "!تشارمز عرض حذف",
      "ar-SA-1": "!تشارم عرض حذف",
      "ar-SA-2": "!تشارم ع حذف",
    },
  },
];

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const AdsDelete = async (bot, context) => {
  if (ads.details.length > 0) {
    ads.details = "";
    await context.Reply("(y) تم حذف العرض.");
    return;
  }
  await context.Reply("(n) لا توجد عروض في الوقت الحالي.");
};

/**
 *
 */
const Commands = [
  new Command("ADSDELETE", {
    method: (null, AdsDelete),
    filters: [new Owner(), new PrivateFilter()],
  }),
];

module.exports = {
  Commands,
  Translation,
};
