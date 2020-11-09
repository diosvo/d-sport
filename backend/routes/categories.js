const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

router.get('/', (req, res) => {
    database.query('SELECT * FROM categories')
        .then((data) => {
            if (data.length > 0) {
                res.json({categories: data});
            } else {
                res.json({message: 'No categories found'});
            }
        }).catch(err => res.json(err));
});

module.exports = router;