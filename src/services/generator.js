const {
  findExclusion,
  hasLowercase,
  hasNumber,
  hasSymbol,
  hasUppercase,
  shuffleArray,
} = require('./utils');
const specialChars = [
  '`',
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '-',
  '_',
  '+',
  '=',
  '<',
  ',',
  '>',
  '.',
  '?',
];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowerCase = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const upperCase = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const excludeOptions = ['excluded', 'length', 'strict'];

module.exports = {
  createPool: async options => {
    let pool = [];
    const keys = Object.keys(options);
    const modifiedKeys = keys.filter(key => !excludeOptions.includes(key));
    if (modifiedKeys.length === 0) {
      pool.push(...lowerCase);
    }

    if (options?.numbers) pool.push(...numbers);
    if (options?.specialChars) pool.push(...pool, ...specialChars);
    if (options?.lowerCase) pool.push(...pool, ...lowerCase);
    if (options?.upperCase) pool.push(...pool, ...upperCase);
    if (options?.excluded) {
      const excludeArray =
        typeof options.excluded === 'string' ? findExclusion(options) : options.excluded;
      pool = pool.filter(char => !excludeArray.includes(char));
    }
    pool = await shuffleArray(pool);
    return Promise.resolve(pool);
  },

  generateArrayOfCharacters: ({ length = 10 }, pool) => {
    let selectedChars = [];
    for (let i = 1; i <= length; i++) {
      const randomNumber = Math.floor(Math.random() * pool.length);
      selectedChars.push(...pool[randomNumber]);
    }
    return Promise.resolve(selectedChars);
  },

  validateStrictString: (string, options) => {
    const keys = Object.keys(options);
    const modifiedKeys = keys.filter(key => !excludeOptions.includes(key));
    let validated = 0;
    modifiedKeys.forEach(key => {
      if (key === 'lowerCase') {
        if (hasLowercase(string)) validated++;
      }
      if (key === 'upperCase') {
        if (hasUppercase(string)) validated++;
      }
      if (key === 'numbers') {
        if (hasNumber(string)) validated++;
      }
      if (key === 'specialChars') {
        if (hasSymbol(string)) validated++;
      }
    });
    return modifiedKeys.length === validated;
  },
};
