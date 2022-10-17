const { WOLFBot } = require("wolf.js");
require("dotenv").config();

const api = new WOLFBot();

module.exports = { api };
api.on("ready", async () => {
  console.log(`[*][${api.config.keyword}] is ready`);
});

api.login(process.env.EMAIL, process.env.PASSWORD);
