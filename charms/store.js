import { client } from "../index.js";
import { formatCharms, formatSection } from "./utility.js";
/**
 * Fetches all charm sections from the store by language.
 * @param {number} languageId - The language identifier.
 * @param {number} max - Maximum number of sections to return.
 * @returns {Promise<Array>} Formatted sections list.
 */
const sections = async (languageId, max) => {
  const sectionsResults = await client.topic.getTopicPageLayout("storecharmsmain", languageId);
  return formatSection(sectionsResults, max);
};
/**
 * Fetches a recipe product list from the store by ID.
 * @param {number} id - The recipe identifier.
 * @param {number} languageId - The language identifier.
 * @param {number} max - Maximum number of results.
 * @returns {Promise<Array<number>>} List of product IDs.
 */
const recipe = async (id, languageId, max) => {
  const recipeResults = await client.topic.getTopicPageRecipeList(
    id,
    languageId,
    max,
    0,
    "product",
  );

  return recipeResults.body.map((r) => {
    return r.id;
  });
};
/**
 * Fetches products from the store and extracts charm IDs.
 * @param {number[]} productsId - Array of product IDs.
 * @param {number} languageId - The language identifier.
 * @returns {Promise<Array<number>>} List of charm IDs.
 */
const products = async (productsId, languageId) => {
  const productsResults = await client.store.getProducts(productsId, languageId);

  return productsResults.map((product) => product.charmId);
};
/**
 * Converts a recipe into a formatted charms array.
 * @param {number} id - The recipe identifier.
 * @param {number} languageId - The language identifier.
 * @param {number} max - Maximum number of recipe items.
 * @returns {Promise<Array<{id: number, image: string, text: string}>>} Formatted charms.
 */
const recipeToCharms = async (id, languageId, max) => {

  const recipeResults = await recipe(id, languageId, max);
  const productsResults = await products(recipeResults, languageId);
  const charmsResults = await client.charm.getByIds(productsResults, languageId);
  return formatCharms(charmsResults, languageId);
};

export { recipeToCharms, sections };
