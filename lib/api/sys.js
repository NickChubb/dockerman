const express = require('express');
const Docker = require('dockerode');
const config =  require('../../config.json');

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
    return res.json(config);
});

/**
 * POST endpoint for updating config
 */
 router.post('/config', (req, res) => {
    console.log("👉 POST /config");
    const updatedConfig = req.body;

    fs.writeFile(config, updatedConfig, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
});

module.exports = router;