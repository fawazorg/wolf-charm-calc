const { api } = require("../bot");
const { Constants } = require("wolf.js");
/**
 *
 * @param {*} groupID
 * @param {*} language
 * @returns
 */
const topSender = async (groupID, language) => {
  const top = await api
    .tipping()
    .getGroupLeaderboard(
      groupID,
      Constants.TipPeriod.DAY,
      Constants.TipType.SUBSCRIBER,
      Constants.TipDirection.SENT
    );
  return formatUsers(top.body.leaderboard.slice(0, 3), language);
};
/**
 *
 * @param {*} groupID
 * @param {*} language
 * @returns
 */
const topReceived = async (groupID, language) => {
  const top = await api
    .tipping()
    .getGroupLeaderboard(
      groupID,
      Constants.TipPeriod.DAY,
      Constants.TipType.SUBSCRIBER,
      Constants.TipDirection.RECEIVED
    );
  return formatUsers(top.body.leaderboard.slice(0, 3), language);
};
/**
 *
 * @param {*} groupID
 * @returns
 */
const totalPoint = async (groupID) => {
  const total = await api
    .tipping()
    .getGroupLeaderboardSummary(
      groupID,
      Constants.TipPeriod.DAY,
      Constants.TipType.SUBSCRIBER,
      Constants.TipDirection.RECEIVED
    );
  return formatNumber(total.body.totalSpend) || "0";
};
/**
 *
 * @param {*} number
 * @returns
 */
const formatNumber = (number) => {
  return api.utility().number().addCommas(number);
};
/**
 *
 * @param {*} arr
 * @param {*} language
 * @returns
 */
const formatUsers = async (arr = [], language) => {
  const comma = language === "ar" ? "ـ" : "-";
  if (arr.length <= 0)
    return api
      .phrase()
      .getByLanguageAndName(language, "message_error_summary_not_found");
  const users = await api
    .subscriber()
    .getByIds(arr.map((e) => e.subscriber.id));
  const results = arr.map((user) => {
    let { nickname, id } = users.find((u) => u.id === user.subscriber.id);
    return `${
      user.rank
    } ${comma}  ${nickname} ( ${id} ) ${comma} ${formatNumber(user.credits)}`;
  });
  return results.join("\n");
};
/**
 *
 * @param {*} groupID
 * @param {*} language
 * @returns
 */
const getSummary = async (groupID, language) => {
  const topSenderList = await topSender(groupID, language);
  const topReceivedList = await topReceived(groupID, language);
  const total = await totalPoint(groupID);
  const phrase = api.phrase().getByLanguageAndName(language, "message_summary");
  return api.utility().string().replace(phrase, {
    topSend: topSenderList,
    topReceived: topReceivedList,
    total,
  });
};

module.exports = { getSummary };
