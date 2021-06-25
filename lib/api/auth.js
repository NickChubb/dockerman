const { v4: uuidv4 } = require('uuid');
const { incorrectLogin: incorrectLogin, correctLogin: correctLogin } = require('../email.js');
const Config = require('../config.js');
const express = require('express');

const config = new Config();
const router = express.Router();

/**
 * Auth API
 */
 
router.use('/login', (req, res) => {

    const credentials = req.body;
    config.sync();
    const validCredentials = { "username": config.auth.username, "password": config.auth.password };

    if (JSON.stringify(credentials) == JSON.stringify(validCredentials)) {
        res.status(200);
        res.send({
            token: uuidv4()
        });
    } else {
        if (config.security.alertIncorrectLogin) {
            incorrectLogin(req.ip);
        }
        res.sendStatus(401);
    }
});

module.exports = router;
