const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/containers', require('./containers.js'));
router.use('/images', require('./images.js'));
router.use('/sys', require('./sys.js'));

module.exports = router;