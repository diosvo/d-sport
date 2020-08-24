const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {database} = require('../config/helpers');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

require('dotenv').config()

router.post('/register', bodyParser.json(), (req, res) => {
    const {email, password, lastname, firstname, dob} = req.body;

    const salt = bcrypt.genSaltSync(10);

    let hashPw = bcrypt.hashSync(password, salt, (err, res) => {
        req.body.password = res;
        console.log(req.body);
    });

    database.table('users')
        .insert({
            email: email,
            password: hashPw,
            fname: firstname || null,
            lname: lastname || null,
            dob: dob || null
        }).catch(err => console.log(err));

    console.log(req.body);

    setTimeout(() => {
        res.status(200).json(req.body)
    }, 3000)
})

router.post('/login', bodyParser.json(), async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json('Email or password is wrong.')
        } else {
            await database.query(`SELECT * FROM users WHERE  email LIKE '%${email}%'`, async (err, res) => {
                if (!res || !(await bcrypt.compare(password, res[0].password))) {
                    res.status(401).json('Email or password is incorrect');
                } else {
                    const id = res[0].id;

                    const privateKey = fs.readFileSync('private.key');
                    const token = jwt.sign({id},
                        privateKey,
                        {algorithm: 'RS256'},
                        {expiresIn: process.env.JWT_EXPIRES_IN});

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
                        ),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).json('Login successfully').redirect("/");

                    console.log('The token is' + token);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;