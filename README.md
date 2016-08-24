# strict-password-generator
Generate a random password with strict requirements


### Install

```bash
$ npm install strict-password-generator --save
```

### Usage

```javascript
const PasswordGenerator = require('strict-password-generator').default;

const passwordGenerator = new PasswordGenerator();

// return value is a unique randomly generated password string
let password = passwordGenerator.generatePassword();
```

### Options
Pass options object to passwordGenerator.generatePassword()

Possible special characters : !@#$%^&*()+_-=}{[]|:;"/?.><,`~',


|            Name          |                  Type                       | Default Value |
|--------------------------|---------------------------------------------|---------------|
| upperCaseAlpha           | Bool                                        |     true      |
| lowerCaseAlpha           | Bool                                        |     true      |
| number                   | Bool                                        |     true      |
| specialCharacter         | Bool                                        |     true      |
| minimumLength            | Int (Must be >= 4)                          |       8       |
| maximumLength            | Int                                         |minimumLength + 4|
| exactLength              | Int                                         |     none      |

### Examples

```javascript
const PasswordGenerator = require('strict-password-generator').default;

const passwordGenerator = new PasswordGenerator();

const options = {
  upperCaseAlpha   : false,
  lowerCaseAlpha   : true,
  number           : true,
  specialCharacter : false,
  minimumLength    : 10,
  maximumLength    : 12
}

let password = passwordGenerator.generatePassword(options);

console.log(password); // example string : qa5859qoz8
```
---
```javascript
const PasswordGenerator = require('strict-password-generator').default;

const passwordGenerator = new PasswordGenerator();

// exactLength will always override minimumLength and maximumLength
const options = {
  minimumLength    : 10,
  maximumLength    : 12,
  exactLength      : 15   
}

let password = passwordGenerator.generatePassword(options);

console.log(password); // example string : 5eT1c^n9,`35C5}
```
