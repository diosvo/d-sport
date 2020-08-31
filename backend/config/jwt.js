const jwt = require('jsonwebtoken');

module.exports = {
    signAccessToken: (email) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN
            const options = {
                expiresIn: process.env.JWT_EXPIRES_IN,
                audience: email
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
}