const express = require('express');
const Docker = require('dockerode');
const fs = require('fs');

const configFileName = 'config.json';
//const config =  require(configPath);

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
 * GET endpoint for docker system info
 */
router.get('/systemInfo', (req, res) => {
    console.log("👉 GET /systemInfo");
    docker.df().then(info => {return res.json(info)});
});

/**
 * GET endpoint for docker version
 */
router.get('/dockerVersion', (req, res) => {
    console.log("👉 GET /dockerVersion");
    docker.version().then(version => {return res.json(version)});
});

/**
 * GET endpoint for config
 */
router.get('/config', (req, res) => {
    console.log("👉 GET /config");
    const config = fs.readFileSync(configFileName);
    return res.json(JSON.parse(config));
});

/**
 * POST endpoint for updating config
 */
 router.post('/config', (req, res) => {
    console.log("👉 POST /config");
    const updatedConfig = JSON.stringify(req.body, null, 2);

    fs.writeFile(configFileName, updatedConfig, (err) => {
        if (err) {
            throw err;
        }
        console.log("Saving to config.json: " + updatedConfig);
    });
});

module.exports = router;
