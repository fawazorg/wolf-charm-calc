const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "PRICE",
    translations: {
      //"en-US": "!tv find",
      "ar-SA": "!تشارمز سعر",
      "ar-SA-1": "!تشارم سعر",
      "ar-SA-2": "!تشارم س",
    },
  },
];

/**
 * charm list
 */
const charms = [
  {
    name: "صندوق الهدايا",
    cost: 200,
    level: 15,
  },
  {
    name: "بالونات فضية",
    cost: 400,
    level: 25,
  },
  {
    name: "بالونات ذهبية",
    cost: 1000,
    level: 50,
  },
  {
    name: "الوردة السوداء",
    cost: 400,
    level: 15,
  },
  {
    name: "الوردة الزرقاء",
    cost: 600,
    level: 25,
  },
  {
    name: "الوردة الذهبية",
    cost: 1000,
    level: 50,
  },
  {
    name: "القلب المتوج",
    cost: 1000,
    level: 25,
  },
  {
    name: "القلب الذهبي",
    cost: 2500,
    level: 50,
  },
  {
    name: "خاتم فضة",
    cost: 600,
    level: 15,
  },
  {
    name: "خاتم ذهبي",
    cost: 1000,
    level: 15,
  },
  {
    name: "قلادة فضة",
    cost: 1200,
    level: 15,
  },
  {
    name: "قلادة ذهبية",
    cost: 2500,
    level: 20,
  },
  {
    name: "قلادة لؤلؤ",
    cost: 3000,
    level: 25,
  },
  {
    name: "خاتم ألماس",
    cost: 7500,
    level: 35,
  },
  {
    name: "خاتم الاحجار الكريمة",
    cost: 7500,
    level: 35,
  },
  {
    name: "قلادة ألماسية",
    cost: 10000,
    level: 50,
  },
  {
    name: "حجر التورمالين",
    cost: 1000,
    level: 15,
  },
  {
    name: "حجر الزبرجد",
    cost: 1500,
    level: 15,
  },
  {
    name: "حجر الزمرد",
    cost: 2500,
    level: 20,
  },
  {
    name: "ياقوت أزرق",
    cost: 5000,
    level: 25,
  },
  {
    name: "ياقوت احمر",
    cost: 10000,
    level: 35,
  },
  {
    name: "ألماسة",
    cost: 25000,
    level: 50,
  },
];

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Price = async (bot, context) => {
  for (const [index, charm] of charms.entries()) {
    if (charm.name === context.Rest) {
      await context.Reply(
        `/me ${charm.name} \nالسعر: ${charm.cost} نقطة\nالمستوى : +${charm.level}`
      );
      return;
      break;
    }
  }
  await context.Reply("(n) تأكد من كتابة اسم التشارم بشكل صحيح.");
};

/**
 *
 */
const Commands = [
  new Command("PRICE", {
    method: (null, Price),
  }),
];

module.exports = {
  Commands,
  Translation,
};
