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

/**
 * Validates that a number is at least 100 and a multiple of 100.
 * @param {string} n - The raw input string.
 * @returns {number|false} Parsed number, or false if invalid.
 */
const is100Multiples = (n) => {
  let newN = client.utility.number.toEnglishNumbers(n);
  if (!Validator.isValidNumber(newN)) {
    return false;
  }
  const num = parseInt(newN);
  if (num < 100) {
    return false;
  }
  if (num % 100 !== 0) {
    return false;
  }
  return num;
};

/**
 * Validates that a percentage is positive and does not exceed 500.
 * @param {string} n - The raw input string.
 * @returns {number|false} Parsed percentage, or false if invalid.
 */
const isValidPercentage = (n) => {
  let newN = client.utility.number.toEnglishNumbers(n);
  if (!Validator.isValidNumber(newN)) {
    return false;
  }
  const num = parseFloat(newN);
  if (num <= 0 || num > 500) {
    return false;
  }
  return num;
};

export { is25Multiples, is100Multiples, isNumber, isValidPercentage };
