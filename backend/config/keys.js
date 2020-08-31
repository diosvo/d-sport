const crypto = require('crypto')

const secretToken = crypto.randomBytes(32).toString('hex')
const refreshToken = crypto.randomBytes(32).toString('hex')

console.table({ secretToken, refreshToken })