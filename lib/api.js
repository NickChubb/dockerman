/*
    API Middleware
    Handles requests to the /api route
*/

const express = require('express');
const { Database } = require('../objects.js');

const db = new Database();
const router = express.Router();

/**
 * Unprotected API Routes
 */

router.use('/auth',         require('./api/auth.js'));

/**
 * Protected API Routes
 */

// Authorization Middleware compares headers in request with tokens in db
// https://stackoverflow.com/questions/46094417/authenticating-the-request-header-with-express
router.use((req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({ error: 'No credentials sent.' });
    }

    // Retrieve base64 auth headers and parse for JSON token
    const auth = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
    const token = JSON.parse(auth).token;

    db.sync();
    db.validateToken(token).then(( response ) => {
        // If token not found in database, return UNAUTHORIZED.
        if (!response) {
            return res.status(403).send({ error: 'Invalid credentials.' });
        }
        next();
    });

});

router.use('/containers',   require('./api/containers.js'));
router.use('/images',       require('./api/images.js'));
router.use('/sys',          require('./api/sys.js'));
router.use('/db',           require('./api/db.js'));

module.exports = router;