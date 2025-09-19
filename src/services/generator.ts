import {
  findExclusion,
  hasLowercase,
  hasNumber,
  hasSymbol,
  hasUppercase,
  shuffleArray,
} from './utils';
import { Options } from '../interfaces/options';
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
const excludeOptions = ['excluded', 'size', 'strict'];
const excludeOptionsPool = ['size', 'strict']


export async function createPool(options?: Options): Promise<string[]> {
  let pool: string[] = [];



  if (options && Object.keys(options).filter(opt => !excludeOptionsPool.includes(opt)).length > 0) {
    if (options?.numbers) pool.push(...numbers);
    if (options?.specialChars) pool.push(...pool, ...specialChars);
    if (options?.lowerCase) pool.push(...pool, ...lowerCase);
    if (options?.upperCase) pool.push(...pool, ...upperCase);
    if (options?.excluded) {
      const excludeArray =
        typeof options.excluded === 'string' ? findExclusion(options) : options.excluded;
      pool = pool.filter(char => !excludeArray?.includes(char));
    }
  } else {
    pool.push(...lowerCase);
  }

  return Promise.resolve(shuffleArray(pool));
}

export function generateArrayOfCharacters({ size = 10 }: Options, pool: string[]) {
  console.log("🚀 ~ generateArrayOfCharacters ~ pool:", pool)
  let selectedChars: string[] = [];

  for (let i = 1; i <= size; i++) {
    const randomNumber: number = Math.floor(Math.random() * pool.length);
    console.log("🚀 ~ generateArrayOfCharacters ~ randomNumber:", randomNumber)
    console.log("🚀 ~ generateArrayOfCharacters ~ pool[randomNumber]:", pool[randomNumber])
    console.log("🚀 ~ generateArrayOfCharacters ~ ...pool[randomNumber]:", ...pool[randomNumber])
    selectedChars.push(...pool[randomNumber]);
  }

  return Promise.resolve(selectedChars);
}

export function validateStrictString(string: string, options: Options) {
  const keys: string[] = Object.keys(options);
  const modifiedKeys: string[] = keys.filter(key => !excludeOptions.includes(key));
  let validated: number = 0;

  modifiedKeys.forEach(key => {
    if (key === 'lowerCase' && hasLowercase(string)) validated++;

    if (key === 'upperCase' && hasUppercase(string)) validated++;

    if (key === 'numbers' && hasNumber(string)) validated++;

    if (key === 'specialChars' && hasSymbol(string)) validated++;
  });

  return modifiedKeys.length === validated;
}
