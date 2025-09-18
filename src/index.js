import {
  createPool,
  generateArrayOfCharacters,
  validateStrictString,
} from './services/generator';
import { convertToString } from './services/utils';

function generateString(options) {
  return createPool(options)
    .then(pool => generateArrayOfCharacters(options, pool))
    .then(generateStringArray => convertToString(generateStringArray))
    .then(string => {
      let generatedString;
      if (options?.strict) {
        if (validateStrictString(string, options)) {
          generatedString = string;
        } else {
          return generateString(options);
        }
      } else {
        generatedString = string;
      }

      return generatedString;
    });
}

export function generate(options = {}) {
  return generateString(options)
}

export function generateMultiple(amount, options = {}) {
  let strings = [];

  for (let i = 1; i <= amount; i++) {
    strings.push(generateString(options))
  }

  return Promise.all(strings)
}
