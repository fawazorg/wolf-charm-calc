const View = require("./view");
const Delete = require("./delete");
const Edite = require("./edite");

const Commands = [...View.Commands, ...Delete.Commands, ...Edite.Commands];
const Translation = [
  ...View.Translation,
  ...Delete.Translation,
  ...Edite.Translation,
];

module.exports = {
  Commands,
  Translation,
};
