const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { database } = require('../config/helpers');
const bcrypt = require('bcryptjs');
const helper = require('../config/helpers')
const bodyParser = require('body-parser');
const createError = require('http-errors');
const { signAccessToken } = require('../config/jwt');

require('dotenv').config()

router.post('/register', bodyParser.json(), async (req, res, next) => {
    try {
        const { email, password, lastname, firstname, dob } = req.body;

        // Email is already registered
        if (!email || !password) throw createError.BadRequest()

        const doesExit = await database.table('users').filter({ email: email }).get();
        if (doesExit) throw createError.Conflict(`${email} is already registered`)

        // Hash password
        const salt = bcrypt.genSaltSync(10);

        let hashPw = bcrypt.hashSync(password, salt, (err, res) => {
            req.body.password = res;
        });

        // Access token
        const accessToken = await signAccessToken(email)

        // Insert into database table 'users'
        await database.table('users')
            .insert({
                email: email,
                password: hashPw,
                firstname: firstname || null,
                lastname: lastname || null,
                dob: dob || null,
                token: accessToken
            }).catch(err => console.log(err));

        res.status(200).json({
            token: accessToken,
            auth: true,
            email: email,
            password: hashPw,
            firstname: firstname || null,
            lastname: lastname || null,
            dob: dob || null,
        })

    } catch (error) {
        next(error)
    }
})

router.post('/login', bodyParser.json(), async (req, res, next) => {

    /* return new Promise((resolve, reject) => {
        jwt.sign({
            id: req.id,
            state: 'true',
            email: req.body.email,
            password: req.body.password
        }, process.env.ACCESS_TOKEN, {
            algorithm: 'HS512',
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if (!err) {
                resolve(token)
                res.status(200).json({
                    token: token,
                    auth: true,
                    id: req.id,
                    email: req.email,
                    firstname: req.firstname,
                    lastname: req.lastname,
                    password: req.password,
                    dob: req.dob,
                    expiresAt: process.env.JWT_EXPIRES_IN
                })
            } else {
                reject()
            }
        })
    }) */

    res.send('login route')
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('refresh token route')
})

router.delete('/logout', async (req, res, next) => {
    res.send('logout route')
})

module.exports = router;