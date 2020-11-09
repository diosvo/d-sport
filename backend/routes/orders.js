const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL ORDERS */
router.get('/', (req, res) => {
    database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id',
            'o.order_date',
            'o.address',
            'o.lastname',
            'o.phone',
            'SUM(od.quantity*p.price) as total',
            'u.email as orderer'])
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json({
                    orders: orders
                })
            } else {
                res.json({message: 'No orders found.'})
            }
        }).catch(err => console.log(err));
});

// Get all order with pagination
router.get('/page/:page/size/:size/keyword', function (req, res) {
    let page = req.params.page;
    let size = req.params.size;
    let start = size * (page - 1);
    let limit = size;
    let totalRecord = 0;
    let sql = '';

    database.query('SELECT * FROM orders').then(result =>
        totalRecord = result.length
    );

    sql = `SELECT ROW_NUMBER() OVER (ORDER BY o.id) AS item_number, o.*, SUM(od.quantity * od.price) AS total, CONCAT(u.firstName , ' ', u.lastname) AS orderer
            FROM orders o 
            INNER JOIN orders_details od ON o.id = od.order_id 
            INNER JOIN users u ON o.user_id = u.id
            GROUP BY o.id 
            LIMIT ${start},${limit}`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    count: totalRecord, //totalRecord
                    totalPage: Math.ceil(totalRecord / size),
                    page: parseInt(page),
                    size: parseInt(size),
                    orders: data,
                })
            } else {
                res.json({
                    count: 0,
                    totalPage: 0,
                    page: parseInt(page),
                    size: parseInt(size),
                    orders: []
                })
            }
        })
        .catch(err => console.log(err));
});

// Get all order with pagination and keyword
router.get('/page/:page/size/:size/keyword/:keyword', function (req, res) {
    let page = req.params.page;
    let size = req.params.size;
    let keyword = req.params.keyword;
    let start = size * (page - 1);
    let limit = size;
    let totalRecord = 0;
    let sql = '';

    database.query('SELECT * FROM orders').then(result =>
        totalRecord = result.length
    );

    if (keyword.trim() == "" || keyword == null || keyword == undefined) {
        sql = `SELECT ROW_NUMBER() OVER (ORDER BY o.id) AS item_number, o.*, SUM(od.quantity * od.price) AS total, CONCAT(u.firstName , ' ', u.lastname) AS orderer
                FROM orders o 
                INNER JOIN orders_details od ON o.id = od.order_id 
                INNER JOIN users u ON o.user_id = u.id
                GROUP BY o.id 
                LIMIT ${start},${limit}`;
    } else {
        sql = `SELECT ROW_NUMBER() OVER (ORDER BY o.id) AS item_number, o.*, SUM(od.quantity * od.price) AS total , CONCAT(u.firstName , ' ', u.lastname) AS orderer
                FROM orders o 
                INNER JOIN orders_details od ON o.id = od.order_id 
                INNER JOIN users u ON o.user_id = u.id
                WHERE o.id=${keyword}
                GROUP BY o.id
                LIMIT ${start},${limit}`;
    }

    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    count: totalRecord,
                    totalPage: Math.ceil(totalRecord / size),
                    page: parseInt(page),
                    size: parseInt(size),
                    orders: data,
                })
            } else {
                res.json({
                    count: 0,
                    totalPage: 0,
                    page: parseInt(page),
                    size: parseInt(size),
                    orders: [],
                    // sql: sql
                })
            }
        })
        .catch(err => console.log(err));
});

// Get Single
router.get('/:id', (req, res) => {
    const orderId = req.params.id;

    database.table('orders_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id',
            'p.image',
            'p.title as name',
            'p.description',
            'p.price',
            'u.id',
            'u.email',
            'od.quantity'
        ])
        .filter({'o.id': orderId})
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.json({message: `No orders found with OrderID ${orderId}`})
            }
        }).catch(err => console.log(err));
});

// New
router.post('/new', (req, res) => {
    const {userId, email, lastname, firstname, address, phone, products} = req.body;

    if (userId !== null && userId > 0 && !isNaN(userId)) {
        database.table('orders')
            .insert({
                user_id: userId,
                lastname: lastname,
                firstname: firstname,
                address: address,
                phone: phone,
                email: email
            }).then(newOrderId => {
            if (newOrderId > 0) {
                products.forEach(async (p) => {
                    let data = await database.table('products')
                        .filter({id: p.id})
                        .withFields(['quantity']).get();

                    let inCart = parseInt(p.inCart);

                    //  The number of  pieces ordered from the quantity column in database
                    if (data.quantity > 0) {
                        data.quantity = data.quantity - inCart;
                        if (data.quantity < 0) {
                            data.quantity = 0;
                        }
                    } else {
                        data.quantity = 0;
                    }

                    // ==> INSERT ORDERS DETAILS
                    database.table('orders_details')
                        .insert({
                            order_id: newOrderId,
                            product_id: p.id,
                            quantity: inCart
                        }).then(newId => {
                        database.table('products')
                            .filter({id: p.id})
                            .update({
                                quantity: data.quantity
                            }).then(successNum => {
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                });
            } else {
                res.json({message: 'New order failed while adding order details', success: false})
            }
            res.json({
                message: `Order successfully place with OrderID ${newOrderId}`,
                success: true,
                order_id: newOrderId,
                products: products
            });
        }).catch(err => console.log(err))
    } else {
        res.json({message: 'New order failed', success: false})
    }
})

// Payment Gateway
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({success: true})
    }, 3000);
});

module.exports = router;