// Authorization Middleware compares headers in request with tokens in db
// https://stackoverflow.com/questions/46094417/authenticating-the-request-header-with-express

const Database = require('../database.js');
const db = new Database();

const privateRoute = async (req, res, next) => {

    if (!req.cookies.token) {
        return res.status(403).send({ error: 'You must be logged in to access this resource.' });
    }

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