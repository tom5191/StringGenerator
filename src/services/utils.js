const premadeFilters = [
  { name: 'urlSafeChars', excluded: ['?', '>', '<', '=', '+', '&', '^', '%', '`'] },
];

export function findExclusion(options) {
  const filter = premadeFilters.find(filter => filter.name === options.excluded);
  return filter.excluded;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function convertToString(stringArray) {
  return shuffleArray(stringArray).join('');
}

export function hasUppercase(value) {
  const regex = new RegExp(/[A-Z]/g);
  return regex.test(value);
}

export function hasLowercase(value) {
  const regex = new RegExp(/[a-z]/g);
  return regex.test(value);
}

export function hasNumber(value) {
  const regex = new RegExp(/[0-9]/g);
  return regex.test(value);
}

export function hasSymbol(value) {
  const regex = new RegExp(/[ `!@#$%^&*()_+\-={};':"|,.<>?~]/);
  return regex.test(value);
}

