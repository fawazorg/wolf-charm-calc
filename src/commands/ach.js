const { Command, CommandContext } = require("cmd.wolf.js");

const Translation = [
  {
    key: "ACH",
    translations: {
      //"en-US": "!tv find",
      "ar-SA": "!تشارمز وسام",
      "ar-SA-1": "!تشارم وسام",
      "ar-SA-2": "!تشارم و",
    },
  },
];

/**
 * charm list
 */
const achivments = [
  {
    name: "الورود",
    description: "قم بافتتاح محل للورود",
    info: `زهرة الاقحوان : 25
وردة حمراء مغلقة : 25
وردة حمراء : 50
وردة بيضاء مغلقة : 50
وردة بيضاء : 100
وردة صفراء مغلقة : 100
وردة صفراء : 200
وردة الهالفيتي السوداء : 400 » +15
وردة زرقاء : 600 » +25
وردة ذهبية : 1000 » +50`,
  },
  {
    name: "المناسبات",
    description: "لنحتفل بالمناسبات",
    info: `بطاقة تهنئة لعيد ميلاد : 25
بالون الاحتفال : 25
مزمار الاحتفال : 50
مفرقعات : 50
كيكة الشوكولاتة : 100
صندوق الهدايا : 200 » +10
بالونات فضية : 400 » +25
بالونات ذهبية : 1000 » +50`,
  },
  {
    name: "الالماس",
    description: "الألماس يدوم للأبد",
    info: `خاتم ألماس : 7500 » +35
قلادة ألماسية : 10000 » +50
ألماسة : 25000 » +50`,
  },
  {
    name: "الاحجار",
    description: "هاوي الأحجار الكريمة",
    info: `حجر الكوارتز : 50
حجر العقيق : 100
حجر اليشم : 200 » +10
حجر العنبر : 400 » +10
حجر التورمالين : 1000 » +15
حجر الزبرجد : 1500 » +15
حجر الزمرد : 2500 » +15
ياقوت أزرق : 5000 » +25
ياقوت أحمر : 10000 » +35
ألماسة : 25000 » +50`,
  },
  {
    name: "برجوازي",
    description: "برجوازي (الفخامة)",
    info: `هاتف ذكي : 200
صدفة اللؤلؤ : 400
ساعة فولاذية : 500 » +10
ساعة على الموضة : 500 » +10
خاتم فضة : 600 » +15
خاتم ذهبي : 1000 » +15
قلادة فضة : 1200 » +15
قلادة ذهب : 2500 » +20
قلادة لؤلؤ : 3000 » +25`,
  },
  {
    name: "الاحتفال",
    description: "حان وقت الوناسة",
    info: `هاتف ذكي : 25
الدي جي الفلة : 25
الألعاب النارية للاحتفالات : 25
قناع الاحتفال : 25
خيمة ولف للاحتفالات : 25
مايك الإبداع والمرح : 25
مكبرات الصوت : 25
عازف العود : 25
تذكرة دخول احتفال ولف : 25`,
  },
  {
    name: "الصداقة",
    description: "الصديق الصدوق",
    info: `مصافحة : 25
ممتاز : 25
السند : 25
مرحبا : 25
أصدقاء للأبد : 25`,
  },
  {
    name: "القلوب",
    description: "دع قلبك ينطرب بلحن الحب",
    info: `قلب : 25
قلب طائر : 50
قفل القلب : 200
مفتاح القلب : 200
قلب متوج : 1000 » +25
قلب ذهبي : 2500 » +50`,
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
const Ach = async (bot, context) => {
  if (context.Rest.length <= 0) {
    await context.Reply(
      `/me • الأوسمة المتاحة :\n ${achivments.map((e) => e.name).join("\n")}`
    );
    return;
  }
  for (const [index, achivment] of achivments.entries()) {
    if (FormatArabic(achivment.name) === FormatArabic(context.Rest)) {
      await context.Reply(
        `/me • ${achivment.description} : \n${achivment.info}`
      );
      return;
      break;
    }
  }
  await context.Reply("(n) تأكد من كتابة اسم وسام بشكل صحيح.");
};

/**
 *
 */
const Commands = [
  new Command("ACH", {
    method: (null, Ach),
  }),
];

module.exports = {
  Commands,
  Translation,
};
