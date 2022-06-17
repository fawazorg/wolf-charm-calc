const { IFilter } = require("@wolf.jet/framework");

module.exports = class PrivateFilter extends IFilter {
  constructor() {
    super();
    this.FailedMessage = "(n) الامر هذا متاح عبر الرسائل الخاصة فقط.";
  }

  /**
   *
   * @param {Client} client
   * @param {CommandContext} context
   */
  Validate = async (client, context) => {
    return !context.Message.IsGroup;
  };
};
