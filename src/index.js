import CryptoJS from "crypto-js";
import traverse from "traverse";

/**
 * traverses an object, encrypting each value of string type
 * using the passphrase
 * @param passphrase the encryption key
 * @param obj the object to encrypt
 * @param ignore a string array of paths to not encrypt
 */
export function encrypt(passphrase, obj, ignore=[]) {
    return traverse(obj).map(function(item) {
        const path = this.path.join('.');
        const encrypt = !ignore.includes(path);
        if (encrypt && typeof item === "string" && item !== "") {
            this.update(CryptoJS.AES.encrypt(item, passphrase).toString());
        }
    });
}

/**
 * traverses an object, decrypting each value of string type
 * using the passphrase
 * @param passphrase the key used to originally encrypt
 * @param obj the object to decrypt
 * @param ignore a string array of paths to not decrypt
 */
export function decrypt(passphrase, obj, ignore=[]) {
    return traverse(obj).map(function(item) {
        const path = this.path.join('.');
        const decrypt = !ignore.includes(path);
        if (decrypt && typeof item === "string" && item !== "") {
            this.update(CryptoJS.AES.decrypt(item, passphrase).toString(CryptoJS.enc.Utf8));
        }
    });
}

export default {
    encryptor(passphrase) {
        // partially apply encrypt with passphrase
        return encrypt.bind(null, passphrase);
    },

    decryptor(passphrase) {
        // partially apply decrypt with passphrase
        return decrypt.bind(null, passphrase);
    }
};
