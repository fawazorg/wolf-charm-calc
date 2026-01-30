/**
 * Filters and formats store sections, removing expired ones.
 * @param {object} sections - The raw topic page layout response.
 * @param {number} max - Maximum number of sections to return.
 * @returns {Array<object>} Formatted section objects with heading, collection, and metadata.
 */
const formatSection = (sections, max) => {
  const filteredSections = sections.body.sectionList.filter((section) => {
    if (section.validity?.endTime) {
      const now = new Date();
      const end = new Date(section.validity.endTime);
      if (now > end) {
        return false;
      }
    }
    return section.elementList.find((e) => e.type === "heading");
  });
  const newSections = filteredSections.slice(0, max).map((section) => {
    const formattedElements = formatElements(section.elementList);
    let elements = formattedElements.map((element) => {
      if (element.type === "collection") {
        return {
          [element.type]: element.properties.recipe.id,
        };
      }
      if (element.type === "heading") {
        return {
          [element.type]: element.properties.text,
          link: element.properties.link.url,
        };
      }
      return {
        [element.type]: "\r\n\r\n" + element.properties.text,
      };
    });
    return Object.assign(...elements, {
      id: section.id,
      endIn: section.validity?.endTime || null,
    });
  });

  return newSections;
};

/**
 * Deduplicates elements by type, merging text properties.
 * @param {Array<object>} elements - The raw element list from a section.
 * @returns {Array<object>} Deduplicated elements.
 */
const formatElements = (elements) => {
  let arr = elements.reduce((p, c) => {
    const index = p.findIndex((i) => i.type === c.type);
    if (index > 0) {
      p[index].properties.text = `\r\n${p[index].properties.text}${c.properties.text}`;
      return [...p];
    }
    return [...p, c];
  }, []);
  return arr;
};

/**
 * Maps charm objects to a simplified format with localized names.
 * @param {Array<object>} charms - The charm objects from the API.
 * @param {number} languageId - The language identifier for name lookup.
 * @returns {Array<{id: number, image: string, text: string}>} Formatted charm entries.
 */
const formatCharms = (charms = [], languageId) => {
  return charms.map((charm) => {
    return {
      id: charm.id,
      image: charm.imageUrl,
      text: charm.nameTranslationList.find((x) => x.languageId === languageId).text,
    };
  });
};

/**
 * Formats a list of offers into a numbered string.
 * @param {Array<object>} offers - The offer objects with heading property.
 * @returns {Promise<string>} Numbered list of offer headings.
 */
const formatOffers = async (offers) => {
  let results = "";
  offers.forEach((ad, index, arr) => {
    if (index === arr.length - 1) {
      results += `${index + 1} - ${ad.heading}`;
      return results;
    }
    results += `${index + 1} - ${ad.heading}\n`;
  });
  return results;
};

/**
 * Formats a single offer into a display string.
 * @param {object} offer - The offer object with heading and optional text.
 * @returns {string} Combined heading and text.
 */
const formatOffer = (offer) => {
  return `${offer.heading}${offer.text || ""}`;
};

/**
 * Builds link options for charm images within text.
 * @param {Array<{text: string, image: string}>} charms - The charm entries.
 * @param {number} padding - Character offset for link positioning.
 * @param {string} text - The text containing charm names.
 * @returns {object} Options object with links array.
 */
const setupCharmsOptions = (charms, padding, text) => {
  let options = {};
  options.links = [];
  charms.forEach((charm) => {
    let start = padding + text.indexOf(charm.text);
    options.links.push({
      start,
      end: start + charm.text.length,
      value: charm.image,
    });
  });
  return options;
};

/**
 * Builds a single link option spanning the heading text.
 * @param {number} length - The length of the heading text.
 * @param {string} link - The URL to link to.
 * @returns {object} The options object with link metadata.
 */
const setupOfferLink = (length, link) => {
  let options = {};
  options.links = [];
  options.links.push({
    start: 0,
    end: length,
    value: link,
  });
  return options;
};

/**
 * Combines an offer with charm image links.
 * @param {Array<{text: string, image: string}>} charms - The charm entries.
 * @param {object} offer - The offer object.
 * @returns {{text: string, options: object}} Formatted text and link options.
 */
const offerWithCharmsLinks = (charms, offer) => {
  const offerText = formatOffer(offer);
  const charmsText = charmsToText(charms);
  const text = offerText + "\r\n\r\n" + charmsText;
  const options = setupCharmsOptions(charms, offerText.length + 4, charmsText);
  return {
    text,
    options,
  };
};

/**
 * Combines an offer with its heading link.
 * @param {object} offer - The offer object containing heading, text, and link.
 * @returns {{text: string, options: object}} The formatted text and link options.
 */
const offerWithLink = (offer) => {
  const text = formatOffer(offer);
  const options = setupOfferLink(offer.heading.length, offer.link);
  return {
    text,
    options,
  };
};

/**
 * Joins charm names into a pipe-separated string.
 * @param {Array<{text: string}>} charms - The charm entries.
 * @returns {string} Pipe-separated charm names.
 */
const charmsToText = (charms) => {
  let results = "";
  charms.forEach((charm, index, arr) => {
    if (index === arr.length - 1) {
      results += `${charm.text} .`;
      return results;
    }
    results += `${charm.text} | `;
  });
  return results;
};

export { formatCharms, formatOffers, formatSection, offerWithCharmsLinks, offerWithLink };
