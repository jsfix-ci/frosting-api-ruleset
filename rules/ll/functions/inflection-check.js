/*eslint-disable valid-jsdoc */

'use strict';

const inflection = require('inflection');


/**
 * checks if a value is either in singular or plural form.
 * @param {boolean} plural if true, checks for plural, otherwise checks for singular
 * @param {string} value the value to check inflection of.
 * @returns Boolean value representing pass or fail of inflection check
 */
const inflectionCheck = (plural, value) => {

  if (plural) {

    return value === inflection.pluralize(value);

  }

  return value === inflection.singularize(value);

};

/**
 * verifies resource name meets inflection rules.
 * @param {*} input
 * @param {*} options
 * @returns Error if resource name violates inflection rule.
 */
const verifyResourceName = (input, options) => {

  //regex for pulling out the main path of the resource name
  const re = /[-a-zA-Z0-9()@:%_+.~#?&=/]*/u;
  const path = String(input.match(re)).split('/');

  if (path.at(-1) === '') {

    //because paths can either end with / or without we need to pop after split if '' is present
    path.pop();

  }
  //resource name should be the last element in the array
  const resourceName = path.at(-1);

  //check if the value is equal to the plural / singular version of itself
  if (!inflectionCheck(options.plural, resourceName)) {

    return [
      {
        message: `${resourceName} should be: ${inflection.pluralize(resourceName)}.`
      }
    ];

  }

};

/**
 * verifies response name is in singular form.
 * @param {*} input
 * @param {*} options
 * @returns Error if name violates singular rule
 */
const verifyResponseType = (input, options) => {

  const path = input.split('/');
  const responseType = path.at(-1);

  if (!inflectionCheck(options.plural, responseType)) {

    return [
      {
        message: `${responseType} should be: ${inflection.singularize(path.at(-1))}.`
      }
    ];

  }

};


/**
 * inflection Check function, checks target's jsonPath query value for plural or singular inflection
 * @param {*} input jsonPath query result
 * @param {target: string, plural: bool} options target must be one of: 'resource-name', 'response-type', plural: if this value should be plural or singular
 * @returns error or null
 */
module.exports = (input, options) => {

  switch (options.type) {

  case '@resource-name':
    return verifyResourceName(input, options);

  case '@response-type':
    return verifyResponseType(input, options);

  default:
    return [
      {
        message: `Invalid function options of type: ${options.type} supplied to inflection-check function.`
      }
    ];

  }

};
