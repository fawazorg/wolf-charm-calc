const { Command, CommandContext } = require("@wolf.jet/framework");
const ads = require("../../data/ads");
const Translation = [
  {
    key: "ADSVIEW",
    translations: {
      "ar-SA": "!تشارمز عرض",
      "ar-SA-1": "!تشارم عرض",
      "ar-SA-2": "!تشارم ع",
    },
  },
];

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const AdsView = async (bot, context) => {
  if (ads.details.length > 0) {
    await context.Reply(ads.details);
    return;
  }
  await context.Reply("(n) لا توجد عروض في الوقت الحالي.");
};

/**
 *
 */
const Commands = [
  new Command("ADSVIEW", {
    method: (null, AdsView),
  }),
];

module.exports = {
  Commands,
  Translation,
};
