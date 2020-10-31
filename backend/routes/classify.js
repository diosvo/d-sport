const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET CATEGORIES */
router.get('/', (req, res) => {
    database.query('SELECT * FROM classify')
        .then((data) => {
        if (data.length > 0) {
            res.json({classify: data});
        } else {
            res.json({message: 'No classify found'});
        }
    }).catch(err => res.json(err));
});

module.exports = router;