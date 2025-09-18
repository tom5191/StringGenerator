export interface Options {
  length?: number,
  upperCase?: boolean,
  lowerCase?: boolean,
  numbers?: boolean,
  specialChars?: boolean,
  excluded?: string | string[],
  strict?: boolean,
}

export interface ValidationOptions extends Partial<Options> {
  unsafeUrl?: boolean
}