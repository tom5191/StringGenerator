// import * as chai from 'chai';
// import { assert } from 'chai';
import { generate, generateMultiple } from '../src/index';
import { createPool } from '../src/services/generator';
import { ValidationOptions } from '../src/interfaces/options';

const unsafeUrlChars = ['?', '>', '<', '=', '+', '&', '^', '%', '`'];

function match(string: string, { upperCase, lowerCase, numbers, specialChars }: ValidationOptions) {
  if (upperCase) assert.match(string, /[A-Z]/g)
  if (lowerCase) assert.match(string, /[a-z]/g)
  if (numbers) assert.match(string, /[0-9]/g)
  if (specialChars) assert.match(string, /[\`\~\!\@\#\$\%\^\&\*\-\_\+\=\<\,\>\.\?]/g)
}

function notMatch(string: string, { upperCase, lowerCase, numbers, specialChars, unsafeUrl }: ValidationOptions) {
  if (upperCase) assert.notMatch(string, /[A-Z]/g)
  if (lowerCase) assert.notMatch(string, /[a-z]/g)
  if (numbers) assert.notMatch(string, /[0-9]/g)
  if (specialChars) assert.notMatch(string, /[\`\~\!\@\#\$\%\^\&\*\-\_\+\=\<\,\>\.\?]/g)
  if (unsafeUrl) assert.notMatch(string, /[?><=+&^$`]/g)
}

describe('string generator', function () {
  describe('pool', function () {
    it('should filter by urlSafeChars', async function () {
      const options = {
        upperCase: true,
        lowerCase: true,
        specialChars: true,
        numbers: true,
        strict: true,
        excluded: 'urlSafeChars',
      };
      const pool = await createPool(options);
      const filteredChars = pool.filter(char => unsafeUrlChars.includes(char));
      assert.equal(filteredChars.length, 0);
    });
    it('should filter by an array of excluded values', async function () {
      const removeChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
      const options = {
        upperCase: true,
        lowerCase: true,
        strict: true,
        excluded: removeChars,
      };
      const pool = await createPool(options);
      const filteredChars = pool.filter(char => unsafeUrlChars.includes(char));
      assert.equal(filteredChars.length, 0);
    });
  });
  describe('generate()', function () {
    it('should accept to be called without the options parameter', function () {
      assert.doesNotThrow(function () {
        generate();
      });
    });
    it('should generate a 10 char string with only lower case', async function () {
      const string = await generate();
      match(string, { lowerCase: true })
      notMatch(string, { upperCase: true, numbers: true, specialChars: true, unsafeUrl: true })
    });
    it('should generate 15 character string', async function () {
      const options = { length: 15 };
      const string = await generate(options);
      assert.equal(string.length, 15);
    });
    it('should only return upper case', async function () {
      const options = { upperCase: true };
      const string = await generate(options);
      match(string, { upperCase: true })
      notMatch(string, { lowerCase: true, numbers: true, specialChars: true, unsafeUrl: true })
    });
    it('should only return upper case and lower case', async function () {
      const options = { lowerCase: true, upperCase: true, strict: true };
      const string = await generate(options);
      match(string, { lowerCase: true, upperCase: true })
      notMatch(string, { numbers: true, specialChars: true, unsafeUrl: true })
    });
    it('should only return numbers', async function () {
      const options = { numbers: true, strict: true };
      const string = await generate(options);
      match(string, { numbers: true })
      notMatch(string, { lowerCase: true, upperCase: true, specialChars: true, unsafeUrl: true })
    });
    it('should only return specialChars', async function () {
      const options = { specialChars: true, strict: true };
      const string = await generate(options);
      match(string, { specialChars: true })
      notMatch(string, { lowerCase: true, upperCase: true, numbers: true })
    });
    it('should create a url safe string with all options required', async function () {
      const options = {
        lowerCase: true,
        upperCase: true,
        numbers: true,
        specialChars: true,
        strict: true,
        excluded: 'urlSafeChars'
      };
      const string = await generate(options)
      match(string, {
        lowerCase: true, upperCase: true, numbers: true, specialChars: true
      })
      notMatch(string, { unsafeUrl: true })
    });
  });
  describe('generateMultiple()', function () {
    it('should generate 3 10 char strings', async function () {
      const strings = await generateMultiple(3)
      assert.equal(strings.length, 3)
    })
  })
});
