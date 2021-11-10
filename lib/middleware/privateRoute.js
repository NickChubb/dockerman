/**
 * 
        Authorization Middleware compares headers in request with tokens in db to create private routes
        see: https://stackoverflow.com/questions/46094417/authenticating-the-request-header-with-express

        Private routes redirect to /dockerman/
 */


const Database = require('../database.js');
const db = new Database();

const privateRoute = async   (req, res, next) => {

    // If no token exists redirect home
    if (!req.cookies.token) {
        return res.status(403).redirect('/dockerman/');
    }

    // Gets the cookies for the token from the request
    const token = req.cookies.token;

    if (token) {
        db.sync();
        db.validateToken(token).then(( response ) => {
            // If token not found in database, return UNAUTHORIZED.
            if (!response) {
                return res.status(403).send({ error: 'Invalid credentials.' });
            }
            next();
        });
    }
}

module.exports = privateRoute;