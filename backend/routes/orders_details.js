const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ORDERS_DETAILS BY ORDER_ID*/
router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    const sql = `SELECT ROW_NUMBER() OVER (ORDER BY orders_details.product_name) AS item_number, product_name, quantity, price 
                    FROM orders_details 
                    WHERE order_id =${orderId}`;
    database.query(sql)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    orders_details: data
                })
            } else {
                res.json({message: 'No orders found.'})
            }
        }).catch(err => console.log(err));
});



module.exports = router;