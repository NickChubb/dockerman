const { v4: uuidv4 } = require('uuid');
const Config = require('../config.js');
const express = require('express');

const config = new Config();
const router = express.Router();

let loginAttempts = 0;
let timeout = false;

/**
 * Auth API
 */
 
router.use('/login', (req, res) => {

    const credentials = req.body;
    config.sync();
    const validCredentials = { "username": config.auth.username, "password": config.auth.password };
    const maxLoginAttempts = config.security.maxLoginAttempts;
    const loginTimeout = config.security.loginTimeout;  

    // If timed out, don't allow login.
    if ( timeout ) {
        res.status(401);
        res.send({ error: `Too many requests, try again in ${loginTimeout} seconds.`});
    }

    if (loginAttempts >= maxLoginAttempts) {
        
        timeout = true;
        const timeoutLength = loginTimeout * 1000;

        setTimeout(() => {
            timeout = false;
	        loginAttempts = 0;
        }, timeoutLength);
    }

    loginAttempts++; // Increment login attempts

    if (JSON.stringify(credentials) == JSON.stringify(validCredentials)) {
        res.status(200);
        res.send({
            token: uuidv4()
        });
    } else {
        if (config.security.alertIncorrectLogin) {
            incorrectLogin(req.ip);
        }
        
        res.status(401);
        res.send({ error: `Incorrect login credentials.`});
    }
});

module.exports = router;
