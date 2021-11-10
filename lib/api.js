/*
    API Middleware
    Handles requests to the /api route, and redirects to respective
    endpoints.

    Auth API is unprotected to allow the login endpoint to be hit
    with login requests before token is generated.
*/

const privateRoute = require('./middleware/privateRoute.js');
const express = require('express');
const router = express.Router();

/**
 * Unprotected API Routes
 */

router.use('/auth',         require('./api/auth.js'));

/**
 * Protected API Routes
 */

router.use(privateRoute);

router.use('/containers',   require('./api/containers.js'));
router.use('/images',       require('./api/images.js'));
router.use('/sys',          require('./api/sys.js'));
router.use('/db',           require('./api/db.js'));

module.exports = router;