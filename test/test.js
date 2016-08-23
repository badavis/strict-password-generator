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
  describe('Test default password generation', () => {
    
  });
});
