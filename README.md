# String Generator

## About
Created with Typescript for Node.js. This package works with both Typescript and Javascript. 

Create passwords, string identifiers, salts, or anything else a random string can be used for. 

## Usage

#### Options

All values are optional, and can be used in any combination

```bash
{
    size: 10,
    upperCase: true,
    lowerCase: true,
    specialChar: true,
    numbers: true,
    strict: true,
    excluded: ['#', '&']
};
```

#### Basic operation to get a 10 character lower case string.

```bash
const code = await generate();
```

#### Generate string lower case 15 letters

```bash
const options = {
    size: 15,
};

const code = await generate(options);

```

#### Generate string upper case case 15 letters

```bash
const options = {
    size: 15,
    upperCase:true
};

const code = await generate(options);

```

#### Generate 15 character string with lower case, upper case, and special characters required

```bash
const options = {
    size: 15,
    upperCase:true
    lowerCase: true,
    specialChar: true,
    strict: true
};

const code = await generate(options);

```

#### Generate default length string with lower case, upper case, and special characters required, but with specific characters removed

```bash
const options = {
    size: 15,
    upperCase:true
    lowerCase: true,
    specialChar: true,
    strict: true,
    excluded: ['*', '$', '#']
};

const code = await generate(options);

```

#### Generate default length string with lower case, upper case, and special characters required, that has save characters for urls

```bash
const options = {
    size: 15,
    upperCase:true
    lowerCase: true,
    specialChar: true,
    strict: true,
    excluded: 'urlSafeChars'
};

const code = await generate(options);

```

#### Generate multiple strings
```bash
const options = {
    size: 15,
    upperCase:true
    lowerCase: true,
    specialChar: true,
    strict: true,
    excluded: ['*', '$', '#']
};

const amount = 3
const codes = await generateMultiple(amount, options)
```