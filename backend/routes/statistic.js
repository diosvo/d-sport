const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET revenue each month of the year => draw chart */
router.get('/revenue/:year', (req, res) => {
    const year = req.params.year;
    const sql = `WITH s AS(
                            SELECT MONTH(o.order_date) AS mon, SUM(od.quantity * od.price) AS total
                            FROM orders o 
                            INNER JOIN orders_details od ON o.id = od.order_id
                            WHERE YEAR(o.order_date) = ${year}
                            GROUP BY o.id
                            ORDER BY MONTH(o.order_date)
                            )
                    SELECT s.mon, SUM(s.total) AS revenue FROM s 
                    GROUP BY s.mon`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

/* GET number of orders was sold each month of the year => draw chart */
router.get('/num-of-orders-was-sold-each-month/:year', (req, res) => {
    const year = req.params.year;
    const sql = `SELECT MONTH(order_date) AS mon, COUNT(id ) AS num FROM orders o 
                    WHERE YEAR(order_date) = ${year}
                    GROUP BY MONTH(order_date)
                    ORDER BY MONTH(order_date)`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

/* GET number of orders was sold in a day */
router.get('/num-of-orders-was-sold/:day', (req, res) => {
    const day = req.params.day;
    const sql = `SELECT COUNT(*) AS num FROM orders 
                    WHERE DAY(order_date) = DAY('${day}')
                    AND MONTH(order_date) = MONTH('${day}')
                    AND YEAR(order_date) = YEAR('${day}')`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data,
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

/* GET number of products was sold in a day */
router.get('/num-of-products-was-sold/:day', (req, res) => {
    const day = req.params.day;
    console.log(day);
    const sql = `SELECT SUM(od.quantity) AS num FROM orders o 
                    INNER JOIN orders_details od
                    ON o.id = od.order_id
                    WHERE DAY(order_date) = DAY('${day}')
                    AND MONTH(order_date) = MONTH('${day}')
                    AND YEAR(order_date) = YEAR('${day}')`;
    database.query(sql)
        .then(data => {
            console.log(data[0].num);
            if (data[0].num != null) {
                res.status(200).json({
                    data: data,
                })
            } else {
                data[0].num = 0;
                res.json({data: data})
            }
        }).catch(err => console.log(err));
});

/* GET revenue in a day */
router.get('/revenue-in-day/:day', (req, res) => {
    const day = req.params.day;
    const sql = `SELECT SUM(quantity*price) AS revenue FROM orders o 
                    INNER JOIN orders_details od
                    ON o.id = od.order_id
                    WHERE DAY(order_date) = DAY('${day}')
                    AND MONTH(order_date) = MONTH('${day}')
                    AND YEAR(order_date) = YEAR('${day}')`;
    database.query(sql)
        .then(data => {
            if (data[0].revenue != null) {
                res.status(200).json({
                    data: data
                })
            } else {
                data[0].revenue = 0;
                res.json({data: data})
            }
        }).catch(err => console.log(err));
});

/* GET list of orders in among time */
router.get('/list-of-orders-in-time/:from_date/:to_date', (req, res) => {
    const from_date = req.params.from_date;
    const to_date = req.params.to_date;

    const sql = `SELECT ROW_NUMBER() OVER (ORDER BY order_date) AS item_number,  o.* 
                    FROM orders o
                    WHERE order_date >= '${from_date}'
                    AND order_date <= '${to_date}'
                    ORDER BY order_date`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

/* GET revenue in among time */
router.get('/revenue-in-time/:from_date/:to_date', (req, res) => {
    const from_date = req.params.from_date;
    const to_date = req.params.to_date;

    const sql = `SELECT SUM(quantity*price) AS revenue FROM orders o 
                    INNER JOIN orders_details od
                    ON o.id = od.order_id
                    WHERE order_date >= '${from_date}'
                    AND order_date <= '${to_date}'`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

/* GET the fastest sell list of product */
router.get('/list-product-fastest-sell/:from_date/:to_date', (req, res) => {
    const from_date = req.params.from_date;
    const to_date = req.params.to_date;

    const sql = `SELECT p.*, od.quantity FROM products p
                    INNER JOIN orders_details od ON p.id = od.product_id
                    INNER JOIN orders o ON o.id = od.order_id
                    WHERE order_date >= '${from_date}'
                    AND order_date <= '${to_date}'
                    ORDER BY od.quantity DESC`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

/* GET list of year when the order was sold */
router.get('/list-of-year', (req, res) => {
    const sql = `SELECT YEAR(order_date) AS year_of_orders 
                    FROM orders
                    GROUP BY YEAR(order_date)
                    ORDER BY YEAR(order_date)`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    data: data,
                })
            } else {
                res.json({message: 'No data found.'})
            }
        }).catch(err => console.log(err));
});

module.exports = router;