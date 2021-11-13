const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "DEFAULT",
    translations: {
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

البوت متخصص في حساب كمية و قيمة التشارمز، لعرض قائمة المساعدة أكتب 
!تشارمز مساعدة`);
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
