const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const { database } = require('../config/helpers');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../config/jwt');
const { authSchema } = require('../config/validation_schema');
require('dotenv').config()

router.post('/register', bodyParser.json(), async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)

        // Email is already registered
        const doesExit = await database.table('users').filter({ email: result.email }).get();
        if (doesExit) throw createError.Conflict(`${result.email} is already registered`)

        // Hash password
        const salt = bcrypt.genSaltSync(10);

        let hashPw = bcrypt.hashSync(result.password, salt, (err, res) => {
            result.password = res;
        });

        // Insert into database table 'users'
        await database.table('users')
            .insert({
                email: result.email,
                password: hashPw,
                firstname: result.firstname || null,
                lastname: result.lastname || null,
                dob: result.dob || null,
                role: null
            }).catch(err => console.log(err));

            res.send("Register Successfully")
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', bodyParser.json(), async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await database.table('users').filter({ email: result.email }).get();

        // Check email
        if (!user) throw createError.NotFound('User not registered')

        // Compare password
        try {
            const isMatch = await bcrypt.compare(result.password, user.password);
            if (!isMatch) throw createError.Unauthorized('Your email or password is incorrect')
        } catch (error) {
            throw error
        }

        // Access token
        const accessToken = await signAccessToken(user.id)

        // Refresh token
        const refreshToken = await signRefreshToken(user.id)

        res.send({
            accessToken, refreshToken,
            auth: true,
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            email: result.email,
        })
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest('Incorrect email or password type.'))
        next(error)
    }
})

router.post('/refresh-token', bodyParser.json(), async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()

        const userID = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userID)
        const refToken = await signRefreshToken(userID)

        res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (err) {
        next(err)
    }
})

router.delete('/logout', bodyParser.json(), async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
    } catch (error) {
        next(error)
    }
})

module.exports = router;