const CryptoJS = require('crypto-js');
const traverse = require('traverse');

/**
 * traverses an object, encrypting each value of string type
 * using the passphrase
 * @param passphrase the encryption key
 * @param obj the object to encrypt
 * @param ignore a string array of paths to not encrypt
 */
function encrypt(passphrase, obj, ignore = []) {
    return traverse(obj).map(function (item) {
        const path = this.path.join('.');
        const encrypt = !ignore.includes(path);
        if (encrypt && typeof item === "string" && item !== "") {
            this.update(CryptoJS.AES.encrypt(item, passphrase).toString());
        }
    });
}

module.exports.encrypt = encrypt;

/**
 * traverses an object, decrypting each value of string type
 * using the passphrase
 * @param passphrase the key used to originally encrypt
 * @param obj the object to decrypt
 * @param ignore a string array of paths to not decrypt
 */
function decrypt(passphrase, obj, ignore = []) {
    return traverse(obj).map(function (item) {
        const path = this.path.join('.');
        const decrypt = !ignore.includes(path);
        if (decrypt && typeof item === "string" && item !== "") {
            this.update(CryptoJS.AES.decrypt(item, passphrase).toString(CryptoJS.enc.Utf8));
        }
    });
}

module.exports.decrypt = decrypt;

module.exports = function (passphrase) {
    return {
        // partially apply encrypt with passphrase
        encrypt: encrypt.bind(null, passphrase),
        // partially apply decrypt with passphrase
        decrypt: decrypt.bind(null, passphrase)
    }
};
