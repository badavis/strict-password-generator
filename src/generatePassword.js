import crypto from 'crypto';
import _ from 'lodash';

class PasswordGenerator {
  constructor() {}

  generateRandomNumber(maximumValue) {
  	if(maximumValue === undefined) maximumValue = 10;
  	//var rand = Math.floor(Math.random() * (maximumValue));
    return crypto.randomBytes(256)[0] % maximumValue;
  	//return rand;
  }

  generateSpecialCharacter() {
   const chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '_', '-', '=', '}', '{', '[', ']', '|', ':', ';', '\"', '/', '?', '.', '>', '<', ',', '`', '~', '\''];
   return chars[this.generateRandomNumber(chars.length)];
  }

  generateLowerCaseAlpha() {
  	const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alpha[this.generateRandomNumber(alpha.length)];
  }

  generateUpperCaseAlpha() {
    return this.generateLowerCaseAlpha().toUpperCase();
  }

  generatePassword(options) {
    let password = [];
    let functionArray = [this.generateSpecialCharacter, this.generateRandomNumber, this.generateLowerCaseAlpha, this.generateUpperCaseAlpha];

    const requirements = {
      lowercase: this.generateLowerCaseAlpha(),
      uppercase: this.generateUpperCaseAlpha(),
      number: this.generateRandomNumber(10),
      specialChar: this.generateSpecialCharacter()
    }

    let passwordLength;
    options.hasOwnProperty('exactLength') ? passwordLength = options.exactLength : passwordLength = 8; // default

    if (!options.hasOwnProperty('minimumLength')) {
      options.minimumLength = 8;
    }

    if (!options.hasOwnProperty('maximumLength')) {
      options.maximumLength = 26;
    }

    _.forEach(requirements, (value, key) => {
      let requirementMet = false;
      while (!requirementMet) {
        const rand = this.generateRandomNumber(passwordLength);
        if (password[rand] === undefined) {
          password[rand] = value;
          requirementMet = true;
        }
      }
    });

    for(let i = 0 ; i < passwordLength; i++) {
    	if(password[i] === undefined) {
      	password[i] = functionArray[this.generateRandomNumber(functionArray.length)]();
      }
    }

    return password.join('');
  }
}



export default PasswordGenerator;
