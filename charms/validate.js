import { Validator } from "wolf.js";
import { client } from "../index.js";

/**
 * Validates and parses a numeric input, optionally converting to charm points.
 * @param {string} n - The raw input string.
 * @param {boolean} comma - Whether to return the value formatted with commas as charm points.
 * @returns {number|string|false} Parsed number, formatted string, or false if invalid.
 */
const isNumber = (n, comma = false) => {
  let newN = client.utility.number.toEnglishNumbers(n);
  if (!Validator.isValidNumber(newN)) {
    return false;
  }
  if (Validator.isLessThanOrEqualZero(parseInt(newN))) {
    return false;
  }
  return comma ? client.utility.number.addCommas(Math.floor(parseInt(newN) * 25)) : parseInt(newN);
};

/**
 * Validates that a number is a multiple of 25 and returns the divided result.
 * @param {string} n - The raw input string.
 * @returns {string|false} Formatted result divided by 25, or false if invalid.
 */
const is25Multiples = (n) => {
  let newN = client.utility.number.toEnglishNumbers(n);

  if (!isNumber(newN)) {
    return false;
  }
  if (parseInt(newN) % 25 !== 0) {
    return false;
  }
  return client.utility.number.addCommas(Math.floor(parseInt(newN) / 25));
};

export { is25Multiples, isNumber };
