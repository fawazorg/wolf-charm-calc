const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "HELP",
    translations: {
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
!تشارمز قيمة <عدد التشارمز> - لعرض قيمة التشارمز بالنقاط
!تشارمز نقطة <عدد النقاط> - لعرض كمية التشارمز التي يمكنك شراءها
!تشارمز سعر <اسم التشارم> - لعرض تفاصيل التشارم
!تشارمز وسام <اسم الوسام> - لعرض التشارمز المرتبطة بالوسام
!تشارم ملخص - لعرض احصائيات التشارمز اليومية للغرفة
!تشارمز عرض - لعرض العروض الخاصة بالتشارمز`);
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
