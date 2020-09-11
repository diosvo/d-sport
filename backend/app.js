const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const createError = require('http-errors');
const compression = require('compression')
const { verifyAccessToken } = require('./config/jwt')

/* Redis */
const { client } = require('./config/redis')

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

app.use(session({
    store: new RedisStore({ client: client }),
    secret: 'rat la secret luon ^^',
    resave: false,
    saveUninitialized: false
}))

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
    res.send('Hi. Im Dios V')
})

/* Import Routes */
const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

/* Use Routes */
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

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

/* Realtime Database */
const mysql = require('mysql');
const http = require('http');
const MySQLEvents = require('@rodrigogs/mysql-events');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO.listen(server);
const { database } = require('./config/helpers');

// Define some array variables
let data = Array(0);
let currentData = Array(0);

// Use IO Socket to set up connection
io.sockets.on('connection', (socket) => {
    database.table('products')
        .withFields(['id', 'title', 'description', 'price', 'quantity', 'another_CatName'])
        .sort({ id: -1 })
        .getAll()
        .then(prods => {
            data = prods;
            io.sockets.emit('initial', { prods: [...data] })
        })
        .catch(err => res.json(err));
})

const program = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'diosvo',
        password: '12121999',
        database: 'd.sport'
    });

    // Create MySQLEvents
    const instance = new MySQLEvents(connection, {
        startAtEnd: true // to record only new binary logs
    });

    await instance.start();

    instance.addTrigger({
        name: 'Monitor all SQL Statements',
        expression: 'd.sport.*',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: e => {
            currentData = e.affectedRows;

            let newData;
            switch (e.type) {
                case "DELETE":
                    newData = currentData[0].before;
                    let index = data.findIndex(p => p.id === newData.id);

                    // If product is present
                    if (index > -1) {
                        data = data.filter(p => p.id !== newData.id);
                        io.sockets.emit('update', { prods: [...data], type: "DELETE" });
                    } else {
                        return;
                    }
                    break;

                case "UPDATE":
                    newData = currentData[0].after;
                    let index2 = data.findIndex(p => p.id === newData.id);

                    // If product is present
                    if (index2 > -1) {
                        data[index2] = newData;
                        io.sockets.emit('update', { prods: [...data], type: "DELETE" });
                    } else {
                        return;
                    }
                    break;

                case "INSERT":
                    database.table('products')
                        .withFields(['id', 'title', 'description', 'image', 'price', 'quantity', 'another_CatName', 'image_1', 'image_2', 'image_3', 'category_id', 'classify_id'])
                        .sort({ id: -1 })
                        .getAll()
                        .then(prods => {
                            data = prods;
                            io.sockets.emit('initial', { prods: [...data] })
                        })
                        .catch(err => res.json(err));
                    break;

                default:
                    break;
            }
        }
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program().then();

server.listen(2609, () => {
    console.log('Server running on port 2609')
})