const premadeFilters = [
  { name: 'urlSafeChars', excluded: ['?', '>', '<', '=', '+', '&', '^', '%', '`'] },
];

module.exports = {
  findExclusion: options => {
    const filter = premadeFilters.find(filter => filter.name === options.excluded);
    return filter.excluded;
  },

  shuffleArray: array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },

  convertToString: stringArray => {
    return module.exports.shuffleArray(stringArray).join('');
  },

  hasUppercase: value => {
    const regex = new RegExp(/[A-Z]/g);
    return regex.test(value);
  },

  hasLowercase: value => {
    const regex = new RegExp(/[a-z]/g);
    return regex.test(value);
  },
  hasNumber: value => {
    const regex = new RegExp(/[0-9]/g);
    return regex.test(value);
  },

  hasSymbol: value => {
    const regex = new RegExp(/[ `!@#$%^&*()_+\-={};':"|,.<>?~]/);
    return regex.test(value);
  },
};
