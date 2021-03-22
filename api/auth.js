const config =  require('../config.json');
const { v4: uuidv4 } = require('uuid');

const express = require('express');
const router = express.Router();;

/**
 * Auth API
 */
 
router.use('/login', (req, res) => {

    const credentials = req.body;
    const validCredentials = { "username": config.auth.username, "password": config.auth.password };

    if (JSON.stringify(credentials) == JSON.stringify(validCredentials)) {
        res.status(200);
        res.send({
            token: uuidv4()
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;