/* CONNECT TO DATABASE */
let Mysqli = require('mysqli');
require('dotenv').config()
const bcrypt = require('bcryptjs');

let conn = new Mysqli({
    Host: process.env.DB_HOST,
    post: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DATABASE,
});

let db = conn.emit(false,'');

module.exports = {
    database: db,

    isPasswordAndUserMatch: async (req, res, next) => {
        const myPlaintextPassword = req.body.password;
        const myEmail = req.body.email;

        const user = await db.table('users').filter({$or:[{ email : myEmail }]}).get();

        if (user) {
            const match = await bcrypt.compare(myPlaintextPassword, user.password);
            if (match) {
                req.email = user.email
                req.firstname = user.firstname
                req.lastname = user.lastname
                req.password = user.password
                req.dob = user.dob
                next();
            } else {
                res.status(401).json({message: "Username or password incorrect", status: false});
            }
        } else {
            res.status(401).json({message: "Username or password incorrect", status: false});
        }
    }
};