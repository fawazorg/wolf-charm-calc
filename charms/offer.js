import { sections, recipeToCharms } from "./store.js";
import { formatOffers, offerWithCharmsLinks, offerWithLink } from "./utility.js";
/**
 * Retrieves all offers for a given language.
 * @param {number} languageId - The language identifier.
 * @param {number} max - Maximum number of offers to return.
* @returns {Promise<string>} Formatted offers text.
 */
const all = async (languageId, max = 8) => {
  const offers = await sections(languageId, max);
  return formatOffers(offers);
};
/**
 * Retrieves a specific offer by index with charm or link data.
 * @param {number} index - The 1-based offer index.
 * @param {number} languageId - The language identifier.
 * @param {number} max - Maximum number of sections to fetch.
 * @returns {Promise<string>} The offer text and display options.
 * @throws {Error} If the index exceeds available offers.
 */
const get = async (index, languageId, max = 8) => {
  const offers = await sections(languageId, max);

  if (index - 1 >= offers.length) {
    throw Error("index its bigger then offers links.");
  }

  const offer = offers[index - 1];

  if (offer.link.length <= 0) {
    const charms = await recipeToCharms(offer.collection, languageId, 10);
    return offerWithCharmsLinks(charms, offer);
  } else {
    return offerWithLink(offer);
  }
};

export { all, get };
