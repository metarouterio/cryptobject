"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encrypt = encrypt;
exports.decrypt = decrypt;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _cryptoJs = require("crypto-js");

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _traverse = require("traverse");

var _traverse2 = _interopRequireDefault(_traverse);

var _curry = require("curry");

var _curry2 = _interopRequireDefault(_curry);

function encrypt(passphrase, obj) {
    return (0, _traverse2["default"])(obj).map(function (item) {
        if (typeof item === "string" && item !== "") {
            return _cryptoJs2["default"].AES.encrypt(item, passphrase).toString();
        }
    });
}

function decrypt(passphrase, obj) {
    return (0, _traverse2["default"])(obj).map(function (item) {
        if (typeof item === "string" && item !== "") {
            return _cryptoJs2["default"].AES.decrypt(item, passphrase).toString(_cryptoJs2["default"].enc.Utf8);
        }
    });
}

exports["default"] = {
    encryptor: function encryptor(passphrase) {
        return (0, _curry2["default"])(encrypt)(passphrase);
    },

    decryptor: function decryptor(passphrase) {
        return (0, _curry2["default"])(decrypt)(passphrase);
    }
};