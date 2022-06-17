const { IFilter } = require("@wolf.jet/framework");

module.exports = class Owner extends IFilter {
  #Maker = [7766, 12500068];
  /**
   * Only Bot Maker Can Use This Command.
   */
  constructor() {
    super();
    this.FailedMessage = "(n) فقط مالك البوت يمكنه استخدام هذا الامر.";
  }
  /**
   *
   * @param {Client} client
   * @param {CommandContext} context
   */
  Validate = async (client, context) => {
    try {
      return this.#Maker.some((e) => e === context.User.Id);
    } catch (e) {
      return false;
    }
  };
};
