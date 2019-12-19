const CryptoJS = require('crypto-js');
let crypto_util = {
    keySize:256,
    ivSize:128,
    iterations:100,
    encrypt: (msg,pass) => {
        let salt = CryptoJS.lib.WordArray.random(128 / 8);
        let key = CryptoJS.PBKDF2(pass, salt, {
            keySize: crypto_util.keySize / 32,
            iterations: crypto_util.iterations
        });
        let iv = CryptoJS.lib.WordArray.random(128 / 8);
        let encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC

        });
        let transitmessage = salt.toString() + iv.toString() + encrypted.toString();
        return transitmessage;
    },

    decrypt: (transitmessage, pass) => {
        let salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
        let iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
        let encrypted = transitmessage.substring(64);
        let key = CryptoJS.PBKDF2(pass, salt, {
            keySize: crypto_util.keySize / 32,
            iterations: crypto_util.iterations
        });
        return CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
    },

    hash:(text,algo) => {
        return CryptoJS[algo](text).toString(CryptoJS.enc.Base64);
    }
};

module.exports = crypto_util;