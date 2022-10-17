const { sections, recipeToCharms } = require("./store");
const {
  formatOffers,
  offerWithCharmsLinks,
  offerWithLink,
} = require("./utility");
/**
 *
 * @param {*} languageId
 * @param {*} max
 */
const all = async (languageId, max = 8) => {
  const offers = await sections(languageId, max);
  return formatOffers(offers);
};
/**
 *
 * @param {*} index
 * @param {*} languageId
 * @returns
 */
const get = async (index, languageId, max = 8) => {
  const offers = await sections(languageId, max);
  if (index - 1 >= offers.length) {
    throw Error("index its bigger then offers links.");
  }
  const offer = offers[index - 1];
  if (offer.link.length <= 0) {
    const charms = await recipeToCharms(offer.collection, languageId, max);
    const { text, options } = offerWithCharmsLinks(charms, offer);
    return { text, options };
  } else {
    const { text, options } = offerWithLink(offer);
    return { text, options };
  }
};

module.exports = { all, get };
