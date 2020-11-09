const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {database} = require('../config/helpers');

// Get all user with pagination
router.get('/page/:page/size/:size/keyword', function (req, res) {
    let page = req.params.page;
    let size = req.params.size;
    let start = size*(page-1);
    let limit = size;
    let totalRecord=0;
    let sql ='';

    database.query('SELECT * FROM users').then(result =>
        totalRecord = result.length
    );

    sql = `SELECT ROW_NUMBER() OVER (ORDER BY u.email) AS item_number, u.* FROM users u LIMIT ${start},${limit}`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    count: totalRecord,
                    totalPage: Math.ceil(totalRecord/size),
                    page: parseInt(page),
                    size: parseInt(size),
                    users: data,
                })
            } else {
                res.json({
                    count: 0, //totalRecord
                    totalPage: 0,
                    page: parseInt(page),
                    size: parseInt(size),
                    users: []
                    //sql: sql
                })
            }
        })
        .catch(err => console.log(err));
});

// Get all user with pagination and keyword
router.get('/page/:page/size/:size/keyword/:keyword', function (req, res) {
    let page = req.params.page;
    let size = req.params.size;
    let keyword = req.params.keyword;
    let start = size*(page-1);
    let limit = size;
    let totalRecord=0;
    let sql ='';

    database.query('SELECT * FROM users').then(result =>
        totalRecord = result.length
    );

    if(keyword.trim()=="" || keyword==null || keyword==undefined){
        sql = `SELECT ROW_NUMBER() OVER (ORDER BY u.email) AS item_number, u.* FROM users u LIMIT ${start},${limit}`;
    }else {
        sql = `SELECT ROW_NUMBER() OVER (ORDER BY u.email) AS item_number, u.* FROM users u
                WHERE email LIKE '%${keyword}%'
                        OR lastname LIKE '%${keyword}%'
                        OR firstname LIKE '%${keyword}%'
                LIMIT ${start},${limit}`;
    }

    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    count: totalRecord, //totalRecord
                    totalPage: Math.ceil(totalRecord/size),
                    page: parseInt(page),
                    size: parseInt(size),
                    users: data,
                })
            } else {
                res.json({
                    count: 0, //totalRecord
                    totalPage: 0,
                    page: parseInt(page),
                    size: parseInt(size),
                    users: []
                    //sql: sql
                })
            }
        })
        .catch(err => console.log(err));
});

/* User by ID */
router.get('/:userId', (req, res) => {
    let userId = req.params.userId;
    database.table('users').filter({id: userId})
        .withFields(['email', 'firstname', 'lastname', 'password', 'dob', 'id'])
        .get().then(user => {
        if (user) {
            res.json({user});
        } else {
            res.json({message: `No user found with ID : ${userId}`});
        }
    }).catch(err => res.json(err));
});

/* Validate Email  */
router.get('/validate/:email', (req, res) => {
    let email = req.params.email;

    database.table('users').filter({email: email})
        .get()
        .then(user => {
            if (user) {
                res.json({user: user, status: true});
            } else {
                res.json({status: false, user: null});
            }
        })
        .catch(err => res.json(err));
});

// Create
router.post('/create', (req, res) => {
    let user = req.body.user;
    // Hash password
    const salt = bcrypt.genSaltSync(10);

    let hashPw = bcrypt.hashSync(user.password, salt, (err, res) => {
       user.password = res;
    });
    let sql;
    if(user.dob ==null){
        sql = `INSERT INTO users (password, email, lastname, firstname, dob, role, photoUrl)
                VALUES("${hashPw}", "${user.email}", "${user.lastname}", "${user.firstname}",
                        null, "${user.role}", "${user.photoUrl}");`;
    }else {
        sql = `INSERT INTO users (password, email, lastname, firstname, dob, role, photoUrl)
                VALUES("${hashPw}", "${user.email}", "${user.lastname}", "${user.firstname}",
                        "${user.dob}", "${user.role}", "${user.photoUrl}");`;
    }
    database.query(sql)
        .then(result => {
            if(result.insertId > 0){
                res.json({
                    success: true,
                    message: "User created successfully",
                })
            }else{
                res.json({
                    success: true,
                    message: "No user has been created"
                })
            }
        }).catch(err => console.log(err));
})

// Update
router.post('/update', (req, res) => {
    let user = req.body.user;
    // Hash password
    const salt = bcrypt.genSaltSync(10);

    let hashPw = bcrypt.hashSync(user.password, salt, (err, res) => {
        user.password = res;
    });
    let sql;
    if(user.dob == null){
        sql = `UPDATE users
                SET password = "${hashPw}",
                    lastname = "${user.lastname}",
                    firstname = "${user.firstname}",
                    dob = null,
                    role = "${user.role}",
                    photoUrl = "${user.photoUrl}"
                WHERE id =${user.id}`;
    }else {
        sql = `UPDATE users
                SET password = "${hashPw}",
                    lastname = "${user.lastname}",
                    firstname = "${user.firstname}",
                    dob = "${user.dob}",
                    role = "${user.role}",
                    photoUrl = ${photoUrl}
                WHERE id =${user.id}`;
    }
    database.query(sql)
        .then(result => {
            if(result.changedRows > 0){
                res.json({
                    success: true,
                    message: "Product updated successfully"
                })
            }else{
                res.json({
                    success: true,
                    message: "Product updated with no change"
                })
            }
        }).catch(err => console.log(err));
})

// Delete
router.delete('/:userId', (req,res)=>{
    let user_id = req.params.userId;
    let sql= `DELETE FROM users WHERE id=${user_id}`;
    database.query(sql)
        .then(result => {
            if(result.affectedRows == 0){
                res.json({
                    success: false,
                    message: `The user with the given ID ${user_id} was not found`
                })
            }else{
                res.json({
                    success: true,
                    message: "User deleted successfully"
                })
            }
        }).catch(err => console.log(err));
});
module.exports = router;
