const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const createError = require('http-errors');
const compression = require('compression')
const { verifyAccessToken } = require('./config/jwt')

/* Middleware */
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send('Inside protected route.')
})

/* Import Routes */
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const ordersDetailsRoute = require('./routes/orders_details');

/* Use Routes */
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders_details', ordersDetailsRoute);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        if (req.header['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
}));

app.use(async (req, res, next) => {
    next(createError.NotFound());
})

app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(2609, () => {
    console.log('Server running on port 2609')
})