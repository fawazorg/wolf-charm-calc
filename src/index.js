const { Client } = require("@wolf.jet/core");
const { CommandSystem } = require("@wolf.jet/framework");
const { Commands, Translation } = require("./commands");
require("dotenv").config();

// Async Init Function
const init = async () => {
  const bot = new Client();

  // Connection Events
  bot.On.IO.V3Connected = () => console.log("Connected");
  bot.On.IO.V3Disconnected = () => console.log("Disconnected");
  bot.On.IO.V3Reconnected = () => console.log("Reconnected");

  // Authentication Events
  bot.On.Security.LoginSuccess = (user) =>
    console.log(`Login Success: ${user.Id}`);
  bot.On.Security.LoginFailed = () => console.log("Login Failed");

  // Command Setup
  const SetupCommand = new CommandSystem(bot);
  SetupCommand.LoadTranslations(Translation);
  SetupCommand.AddCommands(...Commands);

  // Login
  await bot.Login(process.env.EMAIL, process.env.PASSWORD);
};

init();
