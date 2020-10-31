var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

// router.get('/', function (req, res) {
//     database.table('users')
//         .withFields([ 'id' , 'email', 'password', 'lastname', 'firstname', 'dob', 'gender', 'role' ])
//         .getAll().then((list) => {
//         if (list.length > 0) {
//             res.json({users: list});
//         } else {
//             res.json({message: 'No user found'});
//         }
//     }).catch(err => res.json(err));
// });

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
        .withFields(['email', 'firstname', 'lastname', 'password', 'dob', 'gender', 'id'])
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

/* Update User Data */
router.patch('/:userId', async (req, res) => {
    // Get the User ID from the parameter
    let userId = req.params.userId;

    // Search User in Database if any
    let user = await database.table('users').filter({id: userId}).get();
    if (user) {

        let userEmail = req.body.email;
        let userPassword = req.body.password;
        let userFirstName = req.body.fname;
        let userLastName = req.body.lname;
        let userUsername = req.body.username;
        let age = req.body.age;

        // Replace the user's information with the form data ( keep the data as is if no info is modified )
        database.table('users').filter({id: userId}).update({
            email: userEmail !== undefined ? userEmail : user.email,
            password: userPassword !== undefined ? userPassword : user.password,
            username: userUsername !== undefined ? userUsername : user.username,
            fname: userFirstName !== undefined ? userFirstName : user.fname,
            lname: userLastName !== undefined ? userLastName : user.lname,
            age: age !== undefined ? age : user.age
        }).then(result => res.json('User updated successfully')).catch(err => res.json(err));
    }
});

module.exports = router;
