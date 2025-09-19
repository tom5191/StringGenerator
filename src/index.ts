import { Options } from "./interfaces/options";
import { createPool, generateArrayOfCharacters, validateStrictString } from './services/generator'
import { convertToString, } from "./services/utils";

async function generateString(options?: Options): Promise<string> {
  const pool = await createPool(options);
  console.log("🚀 ~ generateString ~ pool:", pool)
  const generateStringArray = await generateArrayOfCharacters(options ?? {}, pool);
  const generatedString = await convertToString(generateStringArray);

  if (options?.strict) {
    try {
      await validateStrictString(generatedString, options);
    } catch (e) {
      return generateString(options);
    }
  }

  return generatedString;
}

export function generate(options?: Options): Promise<string> {
  return generateString(options)
}

export function generateMultiple(amount: number, options?: Options) {
  let strings = [];

  for (let i = 1; i <= amount; i++) {
    strings.push(generateString(options))
  }

  return Promise.all(strings)
}
