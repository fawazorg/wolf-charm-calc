const { api } = require("../bot");
const { Validator } = require("wolf.js");

const isNumber = (n, comma = false) => {
  let newN = api.utility().number().toEnglishNumbers(n);
  if (!Validator.isValidNumber(newN)) {
    return false;
  }
  if (Validator.isLessThanOrEqualZero(parseInt(newN))) {
    return false;
  }
  return comma
    ? api
        .utility()
        .number()
        .addCommas(Math.floor(parseInt(newN) * 25))
    : parseInt(newN);
};

const is25Multiples = (n) => {
  let newN = api.utility().number().toEnglishNumbers(n);

  if (!isNumber(newN)) {
    return false;
  }
  if (parseInt(newN) % 25 !== 0) {
    return false;
  }
  return api
    .utility()
    .number()
    .addCommas(Math.floor(parseInt(newN) / 25));
};

module.exports = {
  isNumber,
  is25Multiples,
};
