'use strict'

const crypto = require('crypto')
var keys = 'secret123'

keys = crypto.createHash('sha256').update(String(keys)).digest('base64').substr(0, 32)

//Encryption
exports.encrypt = function(text) {
    let cipher = crypto.createCipher('aes-256-cbc', Buffer.from(keys))
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
}

//Decryption
exports.decrypt = function(text) {
    let encryptedText = Buffer.from(text, 'hex')
    let decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(keys))
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
