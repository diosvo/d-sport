/* CONNECT TO DATABASE */
let Mysqli = require('mysqli');

let conn = new Mysqli({
    Host: 'localhost:8080',
    post: 3306,
    user: 'diosvo',
    password: '12121999',
    db: 'd.sport'
});

let db = conn.emit(false,'');

module.exports = {
    database: db
};