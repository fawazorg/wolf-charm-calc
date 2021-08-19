const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "HELP",
    translations: {
      //"en-US": "!tv find",
      "ar-SA": "!تشارمز مساعدة",
      "ar-SA-1": "!تشارم مساعدة",
    },
  },
];

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Help = async (bot, context) => {
  await context.Reply(`- مرحبًا بك في بوت حساب التشارمز

!تشارمز مساعدة - لعرض قائمة المساعدة

!تشارمز تكلفة <عدد التشارمز> - لعرض تكلفة التشارمز بالنقاط

!تشارمز نقطة <عدد النقاط> - لعرض كمية التشارمز التي يمكنك شراءها

!تشارمز سعر <اسم التشارم> - لعرض تفاصيل التشارم`);
};

/**
 *
 */
const Commands = [
  new Command("HELP", {
    method: (null, Help),
  }),
];

module.exports = {
  Commands,
  Translation,
};
