const View = require("./view");
const Delete = require("./delete");
const Edit = require("./edit");

const Commands = [...View.Commands, ...Delete.Commands, ...Edit.Commands];
const Translation = [
  ...View.Translation,
  ...Delete.Translation,
  ...Edit.Translation,
];

module.exports = {
  Commands,
  Translation,
};
