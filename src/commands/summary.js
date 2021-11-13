const { Command, CommandContext } = require("cmd.wolf.js");
const { GroupFilter } = require("./filters");

const Translation = [
  {
    key: "SUMMARY",
    translations: {
      "ar-SA": "!تشارمز ملخص",
      "ar-SA-1": "!تشارم ملخص",
      "ar-SA-2": "!تشارم م",
    },
  },
];

/**
 * @param {Client} bot
 * @param {CommandContext} context
 */
const Summary = async (bot, context) => {
  let TopSent = await fetchLeaderboard(bot, context.Group.Id, "sent");
  let TopReceived = await fetchLeaderboard(bot, context.Group.Id, "received");
  let Total = await getTotal(bot, context.Group.Id);
  let respons = "احصائيات الغرفة خلال 24 ساعة الماضية : \n";
  respons += `• الأكثر كرماً : \n ${formatUsers(TopSent)}\n`;
  respons += `• الأكثر شهرة : \n ${formatUsers(TopReceived)}\n`;
  respons += `المجموع : ${formatNumber(Total)} نقطة`;
  await context.Reply(respons);
};

const formatNumber = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

const formatUsers = (users) => {
  let results = "";
  if (users.length <= 0) {
    return "لا يوجد.\n";
  }
  users.forEach((user, index, array) => {
    //Nickname
    results += `${index + 1} ـ ${user.info.Nickname} (${
      user.info.Id
    }) ${formatNumber(user.credits)} نقطة\n`;
  });
  return results;
};

const fetchLeaderboard = async (bot, GID, tipDirection) => {
  let users = [];
  let top = await bot.Tiping.LeaderboardGroup(
    GID,
    "subscriber",
    tipDirection,
    "day"
  );
  if (top.length === 0) {
    return [];
  }
  let TopUsers = top.leaderboard.slice(0, 3);
  if (TopUsers.length === 1) {
    users.push(await bot.Subscribers.GetSubscriber(TopUsers[0].subscriber.id));
  } else {
    users = await bot.Subscribers.GetSubscribers(
      TopUsers.map((u) => u.subscriber.id)
    );
  }
  TopUsers.forEach((user, i) => {
    user["info"] = users.find((i) => i.Id === user.subscriber.id);
  });
  return TopUsers;
};
const getTotal = async (bot, GID) => {
  let total = await bot.Tiping.LeaderboardGroupSummary(
    GID,
    "subscriber",
    "received",
    "day"
  );
  return total.totalSpend;
};
/**
 *
 */
const Commands = [
  new Command("Summary", {
    method: (null, Summary),
    filters: [new GroupFilter()],
  }),
];

module.exports = {
  Commands,
  Translation,
};
