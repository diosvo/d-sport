const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const compression = require('compression')
const logger = require('morgan');
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const {verifyAccessToken} = require('./config/jwt')

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
const categoriesRoute = require('./routes/categories');
const classifyRoute = require('./routes/classify');
const statisticRoute = require('./routes/statistic');

/* Use Routes */
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders_details', ordersDetailsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/classify', classifyRoute);
app.use('/api/statistic', statisticRoute);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression({level: 9}));

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

const port = process.env.PORT || 2609
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})