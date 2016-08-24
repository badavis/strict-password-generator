import { expect } from 'chai';
import { assert } from 'chai';
import Debug from 'debug';
const debug = new Debug('test:generatePassword:');
import _ from 'lodash';
import PasswordGenerator from '../src/generatePassword';

describe('Unit Test Helper Functions', () => {
  beforeEach(() => {
  });

  describe('generateRandomNumber()', () => {
    const passwordGenerator = new PasswordGenerator();
    it('default number generated should be between 0 (inclusive) and 10 (exclusive)', (done) => {
      const randomNumber = passwordGenerator.generateRandomNumber();
      assert.isAtLeast(randomNumber, 0, randomNumber + ' is greater than or equal to 0');
      assert.isBelow(randomNumber, 10, randomNumber + ' is less than 10');
      done();
    });

    it('number generated should be between 0 (inclusive) and 1 (exclusive) when 1 is passed in', (done) => {
      const randomNumber = passwordGenerator.generateRandomNumber(1);
      assert.isAtLeast(randomNumber, 0, randomNumber + ' is greater than or equal to 0');
      assert.isBelow(randomNumber, 1, randomNumber + ' is less than 1');
      done();
    });

    it('number generated should be between 0 (inclusive) and 2 (exclusive) when 2 is passed in', (done) => {
      const randomNumber = passwordGenerator.generateRandomNumber(2);
      assert.isAtLeast(randomNumber, 0, randomNumber + ' is greater than or equal to 0');
      assert.isBelow(randomNumber, 2, randomNumber + ' is less than 2');
      done();
    });

    it('number generated should be between 1 (inclusive) and 2 (exclusive) when 2 and 1 are passed in', (done) => {
      const randomNumber = passwordGenerator.generateRandomNumber(2,1);
      assert.isAtLeast(randomNumber, 1, randomNumber + ' is greater than or equal to 1');
      assert.isBelow(randomNumber, 2, randomNumber + ' is less than 2');
      done();
    });

    it('number generated should be between 100 (inclusive) and 256 (exclusive) when 256 and 100 are passed in', (done) => {
      const randomNumber = passwordGenerator.generateRandomNumber(256,100);
      assert.isAtLeast(randomNumber, 100, randomNumber + ' is greater than or equal to 100');
      assert.isBelow(randomNumber, 256, randomNumber + ' is less than 256');
      done();
    });

  });

  describe('generateSpecialCharacter()', () => {
    const passwordGenerator = new PasswordGenerator();
    const chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '_', '-', '=', '}', '{', '[', ']', '|', ':', ';', '\"', '/', '?', '.', '>', '<', ',', '`', '~', '\''];
    chars.forEach((test) => {
      const randomSpecialCharacter = passwordGenerator.generateSpecialCharacter();
      it('The following randomly generated character... ' + randomSpecialCharacter + ' should exist within the string \' !@#$%^&*()+_-=}{[]|:;\"/?.><,\`~\', \'', (done) => {
        expect(chars).to.include(randomSpecialCharacter);
        done();
      });
    });
  });

  describe('generateUpperCaseAlpha()', () => {
    const passwordGenerator = new PasswordGenerator();
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    alpha.forEach((test) => {
      const randomUpperCaseAlpha = passwordGenerator.generateUpperCaseAlpha();
      it('The following randomly generated alpha character... ' + randomUpperCaseAlpha + ' should exist within the string \' ABCDEFGHIJKLMNOPQRSTUVWXYZ \'', (done) => {
        expect(alpha).to.include(randomUpperCaseAlpha);
        done();
      });
    });
  });

  describe('generateLowerCaseAlpha()', () => {
    const passwordGenerator = new PasswordGenerator();
    const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    alpha.forEach((test) => {
      const randomLowerCaseAlpha = passwordGenerator.generateLowerCaseAlpha();
      it('The following randomly generated alpha character... ' + randomLowerCaseAlpha + ' should exist within the string \' abcdefghijklmnopqrstuvwxyz \'', (done) => {
        expect(alpha).to.include(randomLowerCaseAlpha);
        done();
      });
    });
  });
});

describe('Unit Test generatePassword()', () => {
  describe('Test each configurable option for password generation', () => {
    const passwordGenerator = new PasswordGenerator();
    const upperCaseAlphas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const lowerCaseAlphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '_', '-', '=', '}', '{', '[', ']', '|', ':', ';', '\"', '/', '?', '.', '>', '<', ',', '`', '~', '\''];
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];

    it('upperCaseAlpha : true', (done) => {
      const options = {
        upperCaseAlpha: true
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < upperCaseAlphas.length; i++) {
        if(password.includes(upperCaseAlphas[i])) break;
        if(i === upperCaseAlphas.length - 1) throw new Error('Password ' + password + ' does not contain an upper case alpha character');
      }
      done();
    });

    it('upperCaseAlpha : false', (done) => {
      const options = {
        upperCaseAlpha: false
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < upperCaseAlphas.length; i++) {
        if(password.includes(upperCaseAlphas[i])) throw new Error('Password ' + password + ' contains an upper case alpha character when it should not');
      }
      done();
    });

    it('lowerCaseAlpha : true', (done) => {
      const options = {
        lowerCaseAlpha: true
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < lowerCaseAlphas.length; i++) {
        if(password.includes(lowerCaseAlphas[i])) break;
        if(i === lowerCaseAlphas.length - 1) throw new Error('Password ' + password + ' does not contain a lower case alpha character');
      }
      done();
    });

    it('lowerCaseAlpha : false', (done) => {
      const options = {
        lowerCaseAlpha: false
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < lowerCaseAlphas.length; i++) {
        if(password.includes(lowerCaseAlphas[i])) throw new Error('Password ' + password + ' contains an lower case alpha character when it should not');
      }
      done();
    });

    it('specialCharacter : true', (done) => {
      const options = {
        specialCharacter: true
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < specialCharacters.length; i++) {
        if(password.includes(specialCharacters[i])) break;
        if(i === specialCharacters.length - 1) throw new Error('Password ' + password + ' does not contain a special character');
      }
      done();
    });

    it('specialCharacter : false', (done) => {
      const options = {
        specialCharacter: false
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < specialCharacters.length; i++) {
        if(password.includes(specialCharacters[i])) throw new Error('Password ' + password + ' contains a special character when it should not');
      }
      done();
    });

    it('number : true', (done) => {
      const options = {
        number: true
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < numbers.length; i++) {
        if(password.includes(numbers[i])) break;
        if(i === numbers.length - 1) throw new Error('Password ' + password + ' does not contain a number');
      }
      done();
    });

    it('number : false', (done) => {
      const options = {
        number: false
      };
      const password = passwordGenerator.generatePassword(options);
      for(let i = 0; i < numbers.length; i++) {
        if(password.includes(numbers[i])) throw new Error('Password ' + password + ' contains a number when it should not');
      }
      done();
    });

    it('minimumLength : 24', (done) => {
      const options = {
        minimumLength: 24
      };
      const password = passwordGenerator.generatePassword(options);
      expect(password.length).to.be.gte(options.minimumLength);
      done();
    });

    it('maximumLength : 9', (done) => {
      const options = {
        maximumLength: 9
      };
      const password = passwordGenerator.generatePassword(options);
      expect(password.length).to.be.gte(8).and.to.be.lte(options.maximumLength); // 8 is default minimumLength
      done();
    });

    it('minimumLength : 4, maximumLength : 7', (done) => {
      const options = {
        minimumLength: 4,
        maximumLength: 7
      };
      const password = passwordGenerator.generatePassword(options);
      expect(password.length).to.be.gte(options.minimumLength).and.to.be.lte(options.maximumLength);
      done();
    });

    it('exactLength : 16', (done) => {
      const options = {
        exactLength: 16
      };
      const password = passwordGenerator.generatePassword(options);
      expect(password.length).to.equal(options.exactLength);
      done();
    });
  });

  describe('Test all configurable options at once', () => {
    const passwordGenerator = new PasswordGenerator();
    const upperCaseAlphas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const lowerCaseAlphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '_', '-', '=', '}', '{', '[', ']', '|', ':', ';', '\"', '/', '?', '.', '>', '<', ',', '`', '~', '\''];
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    it('minimumLength: 10, maximumLength: 18, number: true, specialCharacter: true, upperCaseAlpha: true, lowerCaseAlpha: true', (done) => {
      const options = {
        minimumLength: 10,
        maximumLength: 18,
        number: true,
        specialCharacter: true,
        upperCaseAlpha: true,
        lowerCaseAlpha: true
      };
      const password = passwordGenerator.generatePassword(options);
      expect(password.length).to.be.gte(options.minimumLength).and.to.be.lte(options.maximumLength);

      for(let i = 0; i < numbers.length; i++) {
        if(password.includes(numbers[i])) break;
        if(i === numbers.length - 1) throw new Error('Password ' + password + ' does not contain a number');
      }

      for(let i = 0; i < specialCharacters.length; i++) {
        if(password.includes(specialCharacters[i])) break;
        if(i === specialCharacters.length - 1) throw new Error('Password ' + password + ' does not contain a special character');
      }

      for(let i = 0; i < upperCaseAlphas.length; i++) {
        if(password.includes(upperCaseAlphas[i])) break;
        if(i === upperCaseAlphas.length - 1) throw new Error('Password ' + password + ' does not contain an upper case alpha character');
      }

      for(let i = 0; i < lowerCaseAlphas.length; i++) {
        if(password.includes(lowerCaseAlphas[i])) break;
        if(i === lowerCaseAlphas.length - 1) throw new Error('Password ' + password + ' does not contain a lower case alpha character');
      }

      done();
    });
  });
});
