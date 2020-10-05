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
    database: db,
    getUsers() {
        if (!isAdmin()) return unauthorized();
        return ok(users);
    },

    getUserById() {
        if (!isLoggedIn()) return unauthorized();

        // only admins can access other user records
        if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

        const user = users.find(x => x.id === idFromUrl());
        return ok(user);
    },

    ok(body) {
        return of(new HttpResponse({ status: 200, body }));
    },

    unauthorized() {
        return throwError({ status: 401, error: { message: 'unauthorized' } });
    },

    error(message) {
        return throwError({ status: 400, error: { message } });
    },

    isLoggedIn() {
        const authHeader = headers.get('Authorization') || '';
        return authHeader.startsWith('Bearer fake-jwt-token');
    },

    isAdmin() {
        return isLoggedIn() && currentUser().role === Role.Admin;
    },

    currentUser() {
        if (!isLoggedIn()) return;
        const id = parseInt(headers.get('Authorization').split('.')[1]);
        return users.find(x => x.id === id);
    },

    idFromUrl() {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
    }
};