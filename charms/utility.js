const { Constants } = require("wolf.js");
/**
 *
 * @param {Array} sections
 * @param {Number} max
 * @returns {Array}
 */
const formatSection = (sections, max) => {
  const filteredSections = sections.sectionList.filter((section) => {
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
 *
 * @param {Array} elements
 * @returns {Array}
 */
const formatElements = (elements) => {
  let arr = elements.reduce((p, c) => {
    const index = p.findIndex((i) => i.type === c.type);
    if (index > 0) {
      p[
        index
      ].properties.text = `\r\n${p[index].properties.text}${c.properties.text}`;
      return [...p];
    }
    return [...p, c];
  }, []);
  return arr;
};
/**
 *
 * @param {Array} charms
 * @param {Number} languageId
 * @returns {Array}
 */
const formatCharms = (charms = [], languageId) => {
  return charms.map((charm) => {
    return {
      id: charm.id,
      image: charm.imageUrl,
      text: charm.nameTranslationList.find((x) => x.languageId === languageId)
        .text,
    };
  });
};
/**
 *
 * @param {Array} offers
 * @returns {String}
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
 *
 * @param {Object} offer
 * @returns {String}
 */
const formatOffer = (offer) => {
  return `${offer.heading}${offer.text || ""}`;
};
/**
 *
 * @param {Array} charms
 * @param {Number} padding
 * @param {String} text
 * @returns {Object}
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
      type: Constants.MessageLinkingType.EXTERNAL,
    });
  });
  return options;
};
/**
 *
 * @param {Array} charms
 * @param {Number} padding
 * @param {String} text
 * @returns {Object}
 */
const setupOfferLink = (length, link) => {
  let options = {};
  options.links = [];
  options.links.push({
    start: 0,
    end: length,
    value: link,
    type: Constants.MessageLinkingType.EXTERNAL,
  });
  return options;
};
/**
 *
 * @param {Array} charms
 * @param {Object} offer
 * @returns {Object}
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
 *
 * @param {Object} offer
 * @param {String} link
 * @returns {Object}
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
 *
 * @param {Array} charms
 * @returns {String}
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

module.exports = {
  formatSection,
  formatCharms,
  formatOffers,
  offerWithCharmsLinks,
  offerWithLink,
};
