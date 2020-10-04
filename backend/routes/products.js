const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/* === 1. SINGLE PRODUCT === */
router.get('/', function (req, res) {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; // set the current page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 12; // set the limit of items per page

    let startValue;
    let endValue;

    if (page > 0) {
        startValue = (page * limit) - limit; // 0,12,24,36,..
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 12;
    }

    database.table('products as p')
        .join([
            {
                table: 'categories as c',
                on: 'c.id = p.category_id',
            },
            {
                table: 'classify as cl',
                on: 'cl.id = p.classify_id'
            }
        ])
        .withFields(['c.title as categories',
            'cl.name as classify_Name',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.another_CatName',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({ id: .1 })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({ message: 'No products found' })
            }
        }).catch(err => console.log(err));
});

// Get [Single] products
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    console.log('Product ID:', productId);

    database.table('products as p')
        .join([{
            table: 'categories as c',
            on: 'c.id = p.category_id'
        }])
        .withFields(['c.title as categoryName',
            'p.title',
            'p.price',
            'p.quantity',
            'p.image',
            'p.image_1',
            'p.image_2',
            'p.image_3',
            'p.description',
            'p.another_CatName',
            'p.id'
        ])
        .filter({ 'p.id': productId })
        .get()
        .then(prod => {
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({ message: `No product found with product ID ${productId}` });
            }
        }).catch(err => console.log(err));
});

/* === 2. BY CATEGORY === */
router.get('/category/:catName', (req, res) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; // set the current page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 12; // set the limit of items per page

    let startValue;
    let endValue;

    if (page > 0) {
        startValue = (page * limit) - limit; // 0,12,24,36,..
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 12;
    }

    // Fetch the category name from the URL
    const cat_title = req.params.catName;

    database.table('products as p')
        .join([{
            table: 'categories as c',
            on: `c.id = p.category_id WHERE c.title LIKE '%${cat_title}%'`
        }])
        .withFields(['c.title as categories',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.image',
            'p.description',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({ id: .1 })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({ message: `No products found from category ${cat_title}.` })
            }
        }).catch(err => console.log(err));
})

/* === 3. BY CLASSIFY ===*/
router.get('/classify/:classifyName', (req, res) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; // set the current page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 12; // set the limit of items per page

    let startValue;
    let endValue;

    if (page > 0) {
        startValue = (page * limit) - limit; // 0,12,24,36,..
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 12;
    }

    // Fetch the classify name from the URL
    const classify_name = req.params.classifyName;

    database.table('products as p')
        .join([{
            table: 'classify as cl',
            on: `cl.id = p.classify_id WHERE cl.name LIKE '%${classify_name}%'`
        }])
        .withFields(['cl.name as ClassifyName',
            'p.title as ProductName',
            'p.price',
            'p.quantity',
            'p.image',
            'p.another_CatName',
            'p.description',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({ id: .1 })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({ message: `No products found from classify ${classify_name}.` })
            }
        }).catch(err => console.log(err));
})

/* === 4. BY CLASSIFY + CATEGORY === */
router.get('/classify/:classifyID/category/:cateID', (req, res) => {
    // Fetch
    const classify_id = req.params.classifyID;
    const cat_id = req.params.cateID;
    console.log('classifyID:', classify_id, '- categoryID:', cat_id);

    database.table('products as p')
        .join([
            {
                table: 'categories as c',
                on: `c.id = p.category_id`
            },
            {
                table: 'classify as cl',
                on: `cl.id = p.classify_id`
            }
        ])
        .withFields(['cl.name as ClassifyName',
            'c.title as CategoriesName',
            'p.title',
            'p.price',
            'p.quantity',
            'p.image',
            'p.another_CatName',
            'p.description',
            'p.id'
        ])
        .filter({ 'cl.id': classify_id, 'c.id': cat_id })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({ message: `No products found.` })
            }
        }).catch(err => console.log(err));
});

module.exports = router;