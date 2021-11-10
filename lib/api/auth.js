const { v4: uuidv4 } = require('uuid');
const Config = require('../config.js');
const express = require('express');
const { log } = require('../log.js');

const Database = require('../database.js')
const db = new Database();

const config = new Config();
const router = express.Router();

let loginAttempts = 0;
let timeout = false;

/**
 * Auth API -- Login and other Authentication endpoints
 * 
 * The endpoints in this class are unprotected which mean they
 * DO NOT REQUIRE a valid auth token to access them and are public.
 * Consider any endpoint in here unsafe and only to be used if 
 * absolutely necessary.
 */
 
router.use('/login', (req, res) => {

    // Parse request data
    const credentials = { "username": req.body.username, "password": req.body.password };
    const ip = req.body.ip;
    const location = req.body.location;

    // Get parameters from config
    config.sync();
    const validCredentials = { "username": config.auth.username, "password": config.auth.password };
    const maxLoginAttempts = config.security.maxLoginAttempts;
    const loginTimeout = config.security.loginTimeout;  

    // If timed out, don't allow login.
    if ( timeout ) {
        res.status(401);
        res.send({ error: `Too many requests, try again in ${loginTimeout} seconds.`});
    }

    // Timeout when too many login requests sent
    if (loginAttempts >= maxLoginAttempts) {
        
        timeout = true;
        const timeoutLength = loginTimeout * 1000;

        setTimeout(() => {
            timeout = false;
	        loginAttempts = 0;
        }, timeoutLength);
    }

    loginAttempts++; // Increment login attempts

    // Validate credentials
    if (JSON.stringify(credentials) == JSON.stringify(validCredentials)) {
        if (config.security.alertSuccessfulLogin) {
            log(`🔐✅ Successfully logged in from ${ip} at ${location}`);
        }

        const token = uuidv4();
        db.addToken(token, ip, location);
        res.status(200).send({
            token: token
        });
    } else {
        if (config.security.alertIncorrectLogin) {
            log(`🔐🚫 Rejected login request from ${ip} at ${location}`);
        }
        
        res.status(401).send({ error: `Incorrect login credentials.`});
    }
});

// Return true if dockerman has password authentication enabled.
router.get('/useAuth', (req, res) => {
    config.sync();
    const useAuth = config.auth.useAuth;
    res.status(200).send(useAuth);
});

module.exports = router;
