const {
  createPool,
  generateArrayOfCharacters,
  validateStrictString,
} = require('./services/generator');
const { convertToString } = require('./services/utils');

module.exports.generate = options => {
  options = options || {};
  return createPool(options)
    .then(pool => generateArrayOfCharacters(options, pool))
    .then(generateStringArray => convertToString(generateStringArray))
    .then(string => {
      let password;
      if (options?.strict) {
        if (validateStrictString(string, options)) {
          password = string;
        } else {
          module.exports.generate(options);
        }
      } else {
        password = string;
      }

      return password;
    });
};
