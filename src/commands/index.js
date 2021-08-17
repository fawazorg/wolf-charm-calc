const Charm = require("./charm");
const Point = require("./point");
const Defulte = require("./default");
const Help = require("./help");
const Price = require("./price");

const Commands = [
  ...Charm.Commands,
  ...Point.Commands,
  ...Defulte.Commands,
  ...Help.Commands,
  ...Price.Commands,
];
const Translation = [
  ...Charm.Translation,
  ...Point.Translation,
  ...Defulte.Translation,
  ...Help.Translation,
  ...Price.Translation,
];

module.exports = {
  Commands,
  Translation,
};
