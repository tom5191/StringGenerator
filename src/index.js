const {
  createPool,
  generateArrayOfCharacters,
  validateStrictString,
} = require('./services/generator');
const { convertToString } = require('./services/utils');

const generateString = function (options) {
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

module.exports.generate = options => {
  options = options || {};

  return generateString(options)
};

module.exports.generateMultiple = (amount, options) => {
  options = options || {};
  let strings = []
  for (let i = 1; i <= amount; i++) {
    strings.push(generateString(options))
  }
  return Promise.all(strings)
}
