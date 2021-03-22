const express = require('express');
const Docker = require('dockerode');

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
 * GET endpoint for docker system info
 */
router.get('/systemInfo', (req,res) => {
    console.log("👉 GET /systemInfo");
    docker.df().then(info => {return res.json(info)});
});

/**
 * GET endpoint for docker version
 */
router.get('/dockerVersion', (req,res) => {
    console.log("👉 GET /dockerVersion");
    docker.version().then(version => {return res.json(version)});
});

module.exports = router;