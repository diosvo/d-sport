const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Import Routes
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');

// Use Routes
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', usersRoute);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;