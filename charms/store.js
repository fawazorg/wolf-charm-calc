const { api } = require("../bot");
const { formatSection, formatCharms } = require("./utility");
/**
 * get all charms sections form store by language id
 * @param {Number} languageId
 * @returns {Array}
 */
const sections = async (languageId, max) => {
  const sectionsResults = await api.websocket.emit("topic page layout", {
    name: "storecharmsmain",
    languageId: languageId,
  });
  return formatSection(sectionsResults.body, max);
};
/**
 * get recipe form store by id
 * @param {Number} id
 * @param {Number} languageId
 * @param {Number} max
 * @returns {Array}
 */
const recipe = async (id, languageId, max) => {
  const recipeResults = await api.websocket.emit("topic page recipe list", {
    id: id,
    type: "product",
    languageId: languageId,
    offset: 0,
    maxResults: max,
  });
  return recipeResults.body.map((r) => {
    return r.id;
  });
};
/**
 * get products form store by there ids
 * @param {[Number]} productsId
 * @returns {Array}
 */
const products = async (productsId) => {
  const productsResults = await api.websocket.emit("store product", {
    idList: productsId,
  });
  return productsResults.body.map((product) => product.body.charmId);
};
/**
 * convert recipe to charms array
 * @param {Number} id
 * @param {Number} languageId
 * @param {Number} max
 * @returns {Array}
 */
const recipeToCharms = async (id, languageId, max) => {
  const recipeResults = await recipe(id, languageId, max);
  const productsResults = await products(recipeResults);
  const charmsResults = await api.charm().getByIds(productsResults, languageId);
  return formatCharms(charmsResults, languageId);
};

module.exports = {
  sections,
  recipeToCharms,
};
