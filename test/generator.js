const assert = require('chai').assert;
const { generate } = require('../src/index');
const { createPool } = require('../src/services/generator');

const cognitoPasswordExclusions = ['?', '>', '<', '=', '+', '&', '^', '%', '`'];
describe('string generator', function () {
  describe('generate()', function () {
    it('should accept to be called without the options parameter', function () {
      assert.doesNotThrow(function () {
        generate();
      });
    });
    it('should generate a 10 char string with only lower case', async function () {
      const string = await generate();
      assert.equal(string.length, 10);
    });
    it('should generate 15 character string', async function () {
      const options = { length: 15 };
      const string = await generate(options);
      assert.equal(string.length, 15);
    });
    it('should only return upper case', async function () {
      const options = { upperCase: true };
      const string = await generate(options);
      assert.match(string, /[A-Z]/);
    });
    it('should only return lower case', async function () {
      const options = { lowerCase: true };
      const string = await generate(options);
      assert.match(string, /[a-z]/);
    });
    it('should only return upper case and lower case', async function () {
      const options = { lowerCase: true, upperCase: true, strict: true };
      const string = await generate(options);
      assert.match(string, /[a-zA-Z]/);
    });
    it('should only return numbers', async function () {
      const options = { numbers: true, strict: true };
      const string = await generate(options);
      assert.match(string, /[0-9]/);
    });
    it('should only return specialChars', async function () {
      const options = { specialChars: true, strict: true };
      const string = await generate(options);
      assert.match(string, /[`~!@#$%^&*-_+=<,>.?]/);
    });
  });
  describe('pool', function () {
    it('should filter by cognito password', async function () {
      const options = {
        upperCase: true,
        lowerCase: true,
        specialChars: true,
        numbers: true,
        strict: true,
        excluded: 'cognitoPassword',
      };
      const pool = await createPool(options);
      const filteredChars = pool.filter(char => cognitoPasswordExclusions.includes(char));
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
      const filteredChars = pool.filter(char => cognitoPasswordExclusions.includes(char));
      assert.equal(filteredChars.length, 0);
    });
  });
});
