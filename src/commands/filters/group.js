const { IFilter } = require("cmd.wolf.js");

module.exports = class GroupFilter extends IFilter {
  constructor() {
    super();
    this.FailedMessage = "(n) الامر غير متاح عبر الرسائل الخاصة.";
  }

  /**
   *
   * @param {Client} client
   * @param {CommandContext} context
   */
  Validate = async (client, context) => {
    return context.Message.IsGroup;
  };
};
