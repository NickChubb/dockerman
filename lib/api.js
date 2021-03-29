const express = require('express');

const router = express.Router();

router.use('/auth',         require('./api/auth.js'));
router.use('/containers',   require('./api/containers.js'));
router.use('/images',       require('./api/images.js'));
router.use('/sys',          require('./api/sys.js'));
router.use('/db',           require('./api/db.js'));

module.exports = router;