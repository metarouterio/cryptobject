"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;

var _cryptoJs = require("crypto-js");

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _traverse = require("traverse");

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * traverses an object, encrypting each value of string type
 * using the passphrase
 * @param passphrase the encryption key
 * @param obj the object to encrypt
 * @param ignore a string array of paths to not encrypt
 */
function encrypt(passphrase, obj) {
    var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return (0, _traverse2.default)(obj).map(function (item) {
        var path = this.path.join('.');
        var encrypt = !ignore.includes(path);
        if (encrypt && typeof item === "string" && item !== "") {
            this.update(_cryptoJs2.default.AES.encrypt(item, passphrase).toString());
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
function decrypt(passphrase, obj) {
    var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return (0, _traverse2.default)(obj).map(function (item) {
        var path = this.path.join('.');
        var decrypt = !ignore.includes(path);
        if (decrypt && typeof item === "string" && item !== "") {
            this.update(_cryptoJs2.default.AES.decrypt(item, passphrase).toString(_cryptoJs2.default.enc.Utf8));
        }
    });
}

exports.default = {
    encryptor: function encryptor(passphrase) {
        // partially apply encrypt with passphrase
        return encrypt.bind(null, passphrase);
    },
    decryptor: function decryptor(passphrase) {
        // partially apply decrypt with passphrase
        return decrypt.bind(null, passphrase);
    }
};