import crypto from 'crypto';
import _ from 'lodash';
import Debug from 'debug';
const debug = new Debug('src:PasswordGenerator:');

class PasswordGenerator {
  constructor() {}

  generateRandomNumber(maximumValue = 10, minimumValue = 0, retry = 0) {
    debug('Input values to number generator... Max: ', maximumValue, 'Min: ', minimumValue, 'retry: ', retry);
    if(retry >= 1000) { // if number generation fails 1000 times in a row throw error
      throw new Error('Password Generation Failed. Max 1000 attempts exceeded');
    }
    if(minimumValue > maximumValue){
      throw new Error('minimumValue cannot be greater than maximumValue');
    }
    if(minimumValue === maximumValue) return maximumValue;

    const rand = crypto.randomBytes(256)[0] % maximumValue;
    if((rand < minimumValue) && ((rand + minimumValue) >= maximumValue)) { // if true, rand does not meet given criteria and must be regenerated
      return this.generateRandomNumber(maximumValue, minimumValue, retry++);
    }
    else if(rand < minimumValue) return rand + minimumValue;

    return rand;
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
    if(options === undefined) options = {};
    if(options.minimumLength < 4) throw new Error('Error: minimumLength must be greater than or equal to 4');
    if(!options.hasOwnProperty('upperCaseAlpha')) options.upperCaseAlpha = true; // default
    if(!options.hasOwnProperty('lowerCaseAlpha')) options.lowerCaseAlpha = true; // default
    if(!options.hasOwnProperty('specialCharacter')) options.specialCharacter = true; // default
    if(!options.hasOwnProperty('number')) options.number = true; // default
    if(!options.hasOwnProperty('minimumLength')) options.minimumLength = 8; // default
    if(!options.hasOwnProperty('maximumLength')) options.maximumLength = options.minimumLength + 4; // default
    if(!options.hasOwnProperty('exactLength')) {  // if no exactLength is specified, password length will be between minimiumLength and maximumLength (inclusive)
      debug('Password length generation result: ');
      options.exactLength = this.generateRandomNumber(options.maximumLength + 1, options.minimumLength); // add one to maximumLength to ensure inclusivity
      debug(options.exactLength);
    }

    let password = [];
    const requirements = {}
    options.upperCaseAlpha ? requirements.upperCaseAlpha = this.generateUpperCaseAlpha() : requirements.upperCaseAlpha = false;
    options.lowerCaseAlpha ? requirements.lowerCaseAlpha = this.generateLowerCaseAlpha() : requirements.lowerCaseAlpha = false;
    options.specialCharacter ? requirements.specialCharacter = this.generateSpecialCharacter() : requirements.specialCharacter = false;
    options.number ? requirements.number = this.generateRandomNumber() : requirements.number = false;

    _.forEach(requirements, (value, key) => {
      if(value === false) return;
      let requirementMet = false;
      while (!requirementMet) {
        debug('Generate index to place requirement. Length of password: ', options.exactLength);
        const rand = this.generateRandomNumber(options.exactLength); // position between 0 and length of password - 1
        debug('Index generated: ', rand);
        if (password[rand] === undefined) {
          password[rand] = value;
          requirementMet = true;
        }
      }
    });

    for(let i = 0 ; i < options.exactLength; i++) {
      const possibleCharacters = [];
      if(options.upperCaseAlpha) possibleCharacters.push(this.generateUpperCaseAlpha());
      if(options.lowerCaseAlpha) possibleCharacters.push(this.generateLowerCaseAlpha());
      if(options.specialCharacter) possibleCharacters.push(this.generateSpecialCharacter());
      if(options.number) possibleCharacters.push(this.generateRandomNumber());

    	if(password[i] === undefined) {
      	password[i] = possibleCharacters[this.generateRandomNumber(possibleCharacters.length)];
      }
    }

    return password.join('');
  }
}



export default PasswordGenerator;
