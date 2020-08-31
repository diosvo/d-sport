/* CONNECT TO DATABASE */
let Mysqli = require('mysqli');
require('dotenv').config()

let conn = new Mysqli({
    Host: process.env.DB_HOST,
    post: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DATABASE,
});

let db = conn.emit(false, '');

module.exports = {
    database: db
};