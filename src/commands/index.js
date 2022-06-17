const Ach = require("./ach");
const Ads = require("./Ads");
const Charm = require("./charm");
const Default = require("./default");
const Help = require("./help");
const Point = require("./point");
const Price = require("./price");
const Prices = require("./prices");
const Summary = require("./summary");

const Commands = [
  ...Ach.Commands,
  ...Ads.Commands,
  ...Charm.Commands,
  ...Default.Commands,
  ...Help.Commands,
  ...Point.Commands,
  ...Price.Commands,
  ...Prices.Commands,
  ...Summary.Commands,
];
const Translation = [
  ...Ach.Translation,
  ...Ads.Translation,
  ...Charm.Translation,
  ...Default.Translation,
  ...Help.Translation,
  ...Point.Translation,
  ...Price.Translation,
  ...Prices.Translation,
  ...Summary.Translation,
];

module.exports = {
  Commands,
  Translation,
};
