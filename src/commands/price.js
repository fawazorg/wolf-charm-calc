const { Command, CommandContext } = require("@wolf.jet/framework");

const Translation = [
  {
    key: "PRICE",
    translations: {
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
    name: "بالون فضي",
    cost: 400,
    level: 25,
  },
  {
    name: "بالون ذهبي",
    cost: 1000,
    level: 50,
  },
  {
    name: "وردة سوداء",
    cost: 400,
    level: 15,
  },
  {
    name: "وردة زرقاء",
    cost: 600,
    level: 25,
  },
  {
    name: "وردة ذهبية",
    cost: 1000,
    level: 50,
  },
  {
    name: "قلب متوج",
    cost: 1000,
    level: 25,
  },
  {
    name: "قلب ذهبي",
    cost: 2500,
    level: 50,
  },
  {
    name: "خاتم فضي",
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
    name: "قلادة ذهب",
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
    name: "قلادة ألماس",
    cost: 10000,
    level: 50,
  },
  {
    name: "تورمالين",
    cost: 1000,
    level: 15,
  },
  {
    name: "زبرجد",
    cost: 1500,
    level: 15,
  },
  {
    name: "زمرد",
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
 *
 * @param {String} text
 */
const FormatArabic = (text) => {
  return text
    .replaceAll("أ", "ا")
    .replaceAll("ة", "ه")
    .replaceAll("إ", "ا")
    .replaceAll("ؤ", "و");
};
/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Price = async (bot, context) => {
  for (const [index, charm] of charms.entries()) {
    if (FormatArabic(charm.name) === FormatArabic(context.Rest)) {
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
