## Usage

#### Options

All values are optional, and can be used in any combination

```bash
{
    length: 10,
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
    length: 15,
};

const code = await generate(options);

```

#### Generate string upper case case 15 letters

```bash
const options = {
    length: 15,
    upperCase:true
};

const code = await generate(options);

```

#### Generate 15 character string with lower case, upper case, and special characters required

```bash
const options = {
    length: 15,
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
    length: 15,
    upperCase:true
    lowerCase: true,
    specialChar: true,
    strict: true,
    excluded: ['*', '$', '#']
};

const code = await generate(options);

```

#### Generate multiple strings
```bash
const options = {
    length: 15,
    upperCase:true
    lowerCase: true,
    specialChar: true,
    strict: true,
    excluded: ['*', '$', '#']
};

const amount = 3
const codes = await generateMultiple(amount, options)
```