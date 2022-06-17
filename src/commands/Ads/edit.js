const { Command, CommandContext } = require("@wolf.jet/framework");
const { Owner, PrivateFilter } = require("../filters");

const ads = require("../../data/ads");
const Translation = [
  {
    key: "ADSEDIT",
    translations: {
      "ar-SA": "!تشارمز عرض تحرير",
      "ar-SA-1": "!تشارم عرض تحرير",
      "ar-SA-2": "!تشارم ع تحرير",
    },
  },
];

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const AdsEdit = async (bot, context) => {
  if (context.Rest.length > 10 && context.Rest.length < 500) {
    ads.details = context.Rest;
    await context.Reply(`(y) تم تعديل الاعلان الى : \n ${ads.details}`);
    return;
  }
  await context.Reply("(n) الاعلان لابد ان يكون بين 10 و 500 حرف.");
};

/**
 *
 */
const Commands = [
  new Command("ADSEDIT", {
    method: (null, AdsEdit),
    filters: [new Owner(), new PrivateFilter()],
  }),
];

module.exports = {
  Commands,
  Translation,
};
