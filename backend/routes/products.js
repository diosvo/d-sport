const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* === 1. SINGLE PRODUCT (get product list with pagination) === */
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
            'p.image_1',
            'p.image_2',
            'p.image_3',
            'p.description',
            'p.another_CatName',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({ message: 'No products found.' })
            }
        }).catch(err => console.log(err));
});

// Get all product with pagination
router.get('/page/:page/size/:size/keyword', function (req, res) {
    let page = req.params.page;
    let size = req.params.size;
    let start = size*(page-1);
    let limit = size;
    let totalRecord=0;
    let sql ='';

     database.query('SELECT * FROM products').then(result =>
         totalRecord = result.length
    );

    sql = `SELECT ROW_NUMBER() OVER (ORDER BY p.title) AS item_number, p.*, c.title as category_name, cl.name as classify_name 
            FROM products p
                INNER JOIN categories c ON p.category_id = c.id 
            INNER JOIN classify cl ON p.classify_id = cl.id 
            LIMIT ${start},${limit}`;


    database.query(sql)
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: totalRecord, //totalRecord
                    totalPage: Math.ceil(totalRecord/size),
                    page: parseInt(page),
                    size: parseInt(size),
                    products: prods,
                })
            } else {
                res.json({
                    count: 0, //totalRecord
                    totalPage: 0,
                    page: parseInt(page),
                    size: parseInt(size),
                    products: []
                    //sql: sql
                })
            }
        })
        .catch(err => console.log(err));
});

// Get all product with pagination adn keyword
router.get('/page/:page/size/:size/keyword/:keyword', function (req, res) {
    let page = req.params.page;
    let size = req.params.size;
    let keyword = req.params.keyword;
    let start = size*(page-1);
    let limit = size;
    let totalRecord=0;
    let sql ='';

    database.query('SELECT * FROM products').then(result =>
        totalRecord = result.length
    );
    console.log("keyword:",keyword);
    console.log(typeof keyword);
    if(keyword.trim()=="" || keyword==null || keyword==undefined){
        sql = `SELECT p.*, c.title as category_name, cl.name as classify_name 
                FROM products p
                    INNER JOIN categories c ON p.category_id = c.id 
                INNER JOIN classify cl ON p.classify_id = cl.id 
                LIMIT ${start},${limit}`;
    }else {
        sql = `SELECT p.*, c.title as category_name, cl.name as classify_name 
                FROM products p 
                    INNER JOIN categories c ON p.category_id = c.id 
                    INNER JOIN classify cl ON p.classify_id = cl.id 
                WHERE p.title LIKE '%${keyword}%'
                        OR p.another_CatName LIKE '%${keyword}%'
                LIMIT ${start},${limit}`;
    }

    database.query(sql)
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: totalRecord, //totalRecord
                    totalPage: Math.ceil(totalRecord/size),
                    page: parseInt(page),
                    size: parseInt(size),
                    products: prods,
                })
            } else {
                res.json({
                    count: 0, //totalRecord
                    totalPage: 0,
                    page: parseInt(page),
                    size: parseInt(size),
                    products: []
                    //sql: sql
                })
            }
        })
        .catch(err => console.log(err));
});

// Get [Single] products
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;

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
            'p.id',
            'p.category_id',
            'p.classify_id',
            'cl.name as classify_name'
        ])
        .filter({'p.id': productId})
        .get()
        .then(prod => {
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `No product found with product ID ${productId}`});
            }
        }).catch(err => console.log(err));
});

// BY CATEGORY
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
            'p.title',
            'p.price',
            'p.quantity',
            'p.image',
            'p.description',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({message: `No products found from category ${cat_title}.`})
            }
        }).catch(err => console.log(err));
})

// BY CLASSIFY
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
            on: `cl.id = p.classify_id WHERE cl.name = '${classify_name.toLowerCase()}'`
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
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({message: `No products found from classify ${classify_name}.`})
            }
        }).catch(err => console.log(err));
})

// BY CLASSIFY + CATEGORY
router.get('/classify/:classifyID/category/:cateID', (req, res) => {
    // Fetch
    const classify_id = req.params.classifyID;
    const cat_id = req.params.cateID;

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
        .filter({'cl.id': classify_id, 'c.id': cat_id})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                })
            } else {
                res.json({message: `No products found.`})
            }
        }).catch(err => console.log(err));
});

module.exports = router;