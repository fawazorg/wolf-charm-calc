import { TipDirection, TipPeriod, TipType } from "wolf.js";
import { client } from "../index.js";

/**
 * Fetches the top 3 senders for a channel today.
 * @param {number} channleId - The channel identifier.
 * @param {number} language - The language identifier.
 * @returns {Promise<string>} Formatted leaderboard of top senders.
 */
const topSender = async (channleId, language) => {
  const top = await client.tipping.getChannelLeaderboard(
    channleId,
    TipPeriod.DAY,
    TipType.SUBSCRIBER,
    TipDirection.SENT,
  );
  return formatUsers(top.leaderboard.slice(0, 3), language);
};

/**
 * Fetches the top 3 receivers for a channel today.
 * @param {number} channleId - The channel identifier.
 * @param {number} language - The language identifier.
 * @returns {Promise<string>} Formatted leaderboard of top receivers.
 */
const topReceived = async (channleId, language) => {
  const top = await client.tipping.getChannelLeaderboard(
    channleId,
    TipPeriod.DAY,
    TipType.SUBSCRIBER,
    TipDirection.RECEIVED,
  );
  return formatUsers(top.leaderboard.slice(0, 3), language);
};

/**
 * Fetches the total points spent in a channel today.
 * @param {number} channleId - The channel identifier.
 * @returns {Promise<string>} Formatted total points or "0".
 */
const totalPoint = async (channleId) => {
  // TODO: open an issue in wolf.js to fix getChannelLeaderboardSummary
  /* const total = await client
    .tipping
    .getChannelLeaderboardSummary(
      channleId,
      TipPeriod.DAY,
      TipType.SUBSCRIBER,
      TipDirection.RECEIVED
    ); */

  const total = await client.websocket.emit("tip leaderboard group summary", {
    id: channleId,
    period: TipPeriod.DAY,
    type: TipType.SUBSCRIBER,
    tipDirection: TipDirection.RECEIVED,
  });

  return formatNumber(total.body?.totalSpend) || "0";
};

/**
 * Formats a number with comma separators.
 * @param {number} n - The number to format.
 * @returns {string} The comma-formatted number string.
 */
const formatNumber = (n) => {
  return client.utility.number.addCommas(n);
};

/**
 * Formats leaderboard users into a readable string.
 * @param {Array} arr - The leaderboard entries.
 * @param {number} language - The language identifier.
 * @returns {Promise<string>} Formatted user list separated by newlines.
 */
const formatUsers = async (arr = [], language) => {
  const comma = language === "ar" ? "ـ" : "-";
  if (arr.length <= 0)
    return client.phrase.getByLanguageAndName(language, "message_error_summary_not_found");
  const users = await client.subscriber.getByIds(arr.map((e) => e.subscriber.id));
  const results = arr.map((user) => {
    let { nickname, id } = users.find((u) => u.id === user.subscriber.id);
    return `${user.rank} ${comma}  ${nickname} ( ${id} ) ${comma} ${formatNumber(user.credits)}`;
  });
  return results.join("\n");
};

/**
 * Generates a full tipping summary for a channel.
 * @param {number} channleId - The channel identifier.
 * @param {number} language - The language identifier.
 * @returns {Promise<string>} The formatted summary with top senders, receivers, and total.
 */
const getSummary = async (channleId, language) => {
  const topSenderList = await topSender(channleId, language);
  const topReceivedList = await topReceived(channleId, language);
  const total = await totalPoint(channleId);
  const phrase = client.phrase.getByLanguageAndName(language, "message_summary");
  return client.utility.string.replace(phrase, {
    topSend: topSenderList,
    topReceived: topReceivedList,
    total,
  });
};

export { getSummary };
