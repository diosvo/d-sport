const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

/* GET ALL ORDERS_DETAILS */
// router.get('/', (req, res) => {
//     database.query('select o.*, SUM(od.quantity * od.price) as total from orders o inner join orders_details od on o.id = od.order_id group by o.id')
//         .then(orders => {
//             if (orders.length > 0) {
//                 res.status(200).json({
//                     orders: orders
//                 })
//             } else {
//                 res.json({message: 'No orders found.'})
//             }
//         }).catch(err => console.log(err));
// });



module.exports = router;