const Default = require("./default");
const Help = require("./help");
const Levels = require("./levels");
const Offer = require("./offer");
const Point = require("./point");
const Price = require("./price");
const Prices = require("./prices");
const Summary = require("./summary");

const Commands = [Help, Levels, Offer, Point, Price, Prices, Summary];

Default.children = Commands;

module.exports = Default;
