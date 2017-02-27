import { assert } from 'chai';
import cryptobject from '../src/index.js';
const { encryptor, decryptor } = cryptobject;

describe('cryptobject', function() {
    const passphrase = 'testpass';
    const encrypt = encryptor(passphrase);
    const decrypt = decryptor(passphrase);

    describe('#encryptor', function() {
        it('encrypts string values in an object', function() {
            const obj = {
                key: 'value'
            };
            const encryptedObj = encrypt(obj);
            assert(encryptedObj.key !== 'value', 'value should change after encryption');
            assert(encryptedObj.key.length > obj.key.length, 'encrypted value length should be greater than length of original value');
        });

        it('does not encrypt fields specified in ignore', function() {
            const obj = { key: 'value', ignore: 'ignored' };
            const ignore = ['ignore'];
            const encryptedObj = encrypt(obj, ignore);
            assert(encryptedObj.ignore === 'ignored', 'should ignore fields passed in via array');
        });

        it('ignores nested paths with dot syntax', function() {
            const obj = {
                key: 'value',
                child: {
                    ignore: 'ignored'
                }
            };
            const ignore = ['child.ignore'];
            const encryptedObj = encrypt(obj, ignore);
            assert(encryptedObj.child.ignore === 'ignored', 'should ignore nested paths provided via ignore');
        });
    });

    describe('#decryptor', function() {
        it('decrypts an object', function() {
            const obj = {
                key: 'value'
            };
            const encryptedObj = encrypt(obj);
            const decryptedObj = decrypt(encryptedObj);
            assert(decryptedObj.key === 'value', 'decrypt should get the original value back');
        });

        it('does not decrypt an ignored field', function() {
            const obj = {
                key: 'value',
                child: {
                    ignore: 'ignored'
                }
            };
            const ignore = ['key', 'child.ignore'];
            const decryptedObj = decrypt(obj, ignore);
            assert.deepEqual(obj, decryptedObj);
        });
    });
});
