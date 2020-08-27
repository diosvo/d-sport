var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

router.get('/', function (req, res) {
    database.table('users')
        .withFields([ 'username' , 'email', 'fname', 'lname', 'age', 'role', 'id' ])
        .getAll().then((list) => {
        if (list.length > 0) {
            res.json({users: list});
        } else {
            res.json({message: 'No use found'});
        }
    }).catch(err => res.json(err));
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
