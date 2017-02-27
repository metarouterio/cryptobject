import { assert } from 'chai';
import cryptobject from '../src/index.js';
const { encryptor, decryptor } = cryptobject;

describe('cryptobject', function() {
    const passphrase = 'testpass';
    const encrypt = encryptor(passphrase);
    const decrypt = decryptor(passphrase);
    const obj = {
        key: 'value'
    };

    describe('#encryptor', function() {
        it('encrypts string values in an object', function() {
            const encryptedObj = encrypt(obj);
            assert(encryptedObj.key !== 'value', 'value should change after encryption');
            assert(encryptedObj.key.length > obj.key.length, 'Encrypted value length should be greater than length of original value');
        });
    });

    describe('#decryptor', function() {
        it('decrypts an object', function() {
            const encryptedObj = encrypt(obj);
            const decryptedObj = decrypt(encryptedObj);
            assert(decryptedObj.key === 'value', 'decrypt should get the original value back');
        });
    });
});
