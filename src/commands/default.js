const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "DEFAULT",
    translations: {
      //"en-US": "!tv find",
      "ar-SA": "!تشارمز",
      "ar-SA-1": "!تشارم",
    },
  },
];
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Defulte = async (bot, context) => {
  await context.Reply(`- مرحبًا بك في بوت حساب التشارمز

البوت مخصص لحساب عدد و تكلفة التشارمز، لعرض قائمة المساعدة اكتب !تشارمز مساعدة`);
};

/**
 *
 */
const Commands = [
  new Command("DEFAULT", {
    method: (null, Defulte),
  }),
];

module.exports = {
  Commands,
  Translation,
};
