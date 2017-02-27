import CryptoJS from "crypto-js";
import traverse from "traverse";
import curry from "curry";

export function encrypt(passphrase, obj) {
    return traverse(obj).map(function(item) {
        if (typeof item === "string" && item !== "") {
            this.update(CryptoJS.AES.encrypt(item, passphrase).toString());
        }
    });
}

export function decrypt(passphrase, obj) {
    return traverse(obj).map(function(item) {
        if (typeof item === "string" && item !== "") {
            this.update(CryptoJS.AES.decrypt(item, passphrase).toString(CryptoJS.enc.Utf8));
        }
    });
}

export default {
    encryptor(passphrase) {
        return curry(encrypt)(passphrase);
    },

    decryptor(passphrase) {
        return curry(decrypt)(passphrase);
    }
};
