const Charm = require("./charm");
const Point = require("./point");
const Defulte = require("./default");
const Help = require("./help");
const Price = require("./price");
const Ach = require("./ach");

const Commands = [
  ...Ach.Commands,
  ...Charm.Commands,
  ...Point.Commands,
  ...Defulte.Commands,
  ...Help.Commands,
  ...Price.Commands,
];
const Translation = [
  ...Ach.Translation,
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
