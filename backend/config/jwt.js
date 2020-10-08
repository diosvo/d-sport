const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN
            const options = {
                expiresIn: process.env.JWT_EXPIRES_IN,
                audience: `${userID}`
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN
            const options = {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
                audience: `${userID}`
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError())
                    return
                }
                resolve(token)

            })
        })
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN,
                (err, payload) => {
                    if (err) return reject(createError.Unauthorized())
                    const userID = payload.aud

                    if (err) {
                        console.log(err.message);
                        reject(createError.InternalServerError())
                        return
                    } else {
                        if (refreshToken) return resolve(userID)
                        reject(createError.Unauthorized())
                    }
                })
        })
    }
}