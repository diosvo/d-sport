const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

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

// Get Single
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

// By Category
router.get('/category/:catName', (req, res) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; // set the current page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 24; // set the limit of items per page

    let startValue;
    let endValue;

    if (page > 0) {
        startValue = (page * limit) - limit; // 0,12,24,36,..
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 24;
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

// By Classify
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

// Both
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

// for: [Admin]
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
    if(keyword.trim()=="" || keyword==null || keyword==undefined){
        sql = `SELECT ROW_NUMBER() OVER (ORDER BY p.title) AS item_number, p.*, c.title as category_name, cl.name as classify_name 
                FROM products p
                INNER JOIN categories c ON p.category_id = c.id 
                INNER JOIN classify cl ON p.classify_id = cl.id 
                LIMIT ${start},${limit}`;
    }else {
        sql = `SELECT ROW_NUMBER() OVER (ORDER BY p.title) AS item_number,p.*, c.title as category_name, cl.name as classify_name 
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
                // tinh lai totalRecord, vi no phu phuoc vao danh sach sp dc tim thay
                totalRecord = prods.length;
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

router.post('/create', (req, res) => {
    let product = req.body.product;
    let sql = `INSERT INTO products (title, image, image_1, image_2, image_3, description
                                    , price, quantity, another_CatName, category_id, classify_id)
                VALUES("${product.title}", "${product.image}", "${product.image_1}", "${product.image_2}",
                        "${product.image_3}", "${product.description}", ${product.price}, ${product.quantity},
                         "${product.another_CatName}", ${product.category_id}, ${product.classify_id});`;
    database.query(sql)
        .then(result => {
            if(result.insertId > 0){
                res.json({
                    success: true,
                    message: "Product created successfully"
                })
            }else{
                res.json({
                    success: true,
                    message: "No product has been created"
                })
            }
        }).catch(err => console.log(err));
})

router.post('/update', (req, res) => {
    let product = req.body.product;
    let sql = `UPDATE products
                SET title = "${product.title}",
                    image = "${product.image}",
                    image_1 = "${product.image_1}",
                    image_2 = "${product.image_2}",
                    image_3 = "${product.image_3}",
                    description = "${product.description}",
                    price = ${product.price},
                    quantity = ${product.quantity},
                    another_CatName = "${product.another_CatName}",
                    category_id = ${product.category_id},
                    classify_id = ${product.classify_id}
                WHERE id =${product.id}`;
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

router.delete('/:id', (req,res)=>{
    let product_id = req.params.id;
    let sql= `DELETE FROM products WHERE id=${product_id}`;
    database.query(sql)
        .then(result => {
            if(result.affectedRows == 0){
                res.json({
                    success: false,
                    message: `The product with the given ID ${product_id} was not found`
                })
            }else{
                res.json({
                    success: true,
                    message: "Product deleted successfully"
                })
            }
        }).catch(err => console.log(err));
})

module.exports = router;