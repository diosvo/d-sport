const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {database} = require('../config/helpers');
const bcrypt = require('bcryptjs');
const helper = require('../config/helpers')
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
            firstname: firstname || null,
            lastname: lastname || null,
            dob: dob || null
        }).catch(err => console.log(err));

    console.log(req.body, '- Register Successfully');

    setTimeout(() => {
        res.status(200).json(req.body)
    }, 3000)
})

router.post('/login', bodyParser.json(), helper.isPasswordAndUserMatch, (req, res) => {

    const secret = "1SBz93MsqTs7KgwARcB0I0ihpILIjk3w";
    let token = jwt.sign({state: 'true', email: req.body.email, password: req.body.password}, secret, {
        algorithm: 'HS512',
        expiresIn: '4h'
    })

    res.status(200).json({
        token: token,
        auth: true,
        email: req.email,
        firstname: req.firstname,
        lastname: req.lastname,
        password: req.password,
        dob: req.dob
    })
})

module.exports = router;