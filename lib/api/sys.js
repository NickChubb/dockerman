const os = require('os');
var child_process = require('child_process');
const express = require('express');
const Docker = require('dockerode');
const Config = require('../config.js');

const config =  new Config();
const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
 * GET endpoint for docker system info
 * 
 * from Dockerode
 */
router.get('/systemInfo', (req, res) => {
    console.log("👉 GET /api/sys/systemInfo");
    docker.df().then(info => {return res.json(info)});
});

/**
 * GET endpoint for docker version
 */
router.get('/dockerVersion', (req, res) => {
    console.log("👉 GET /api/sys/dockerVersion");
    docker.version().then(version => {return res.json(version)});
});

/**
 * GET endpoint for config
 */
router.get('/config', (req, res) => {
    console.log("👉 GET /api/sys/config");
    return res.json(config.read());
});

/**
 * POST endpoint for updating config
 */
 router.post('/config', (req, res) => {
    console.log("👉 POST /api/sys/config");
    const updatedConfig = JSON.stringify(req.body, null, 2);
    config.write(updatedConfig);
});

/**
 * GET endpoint for various system info
 * 
 * Uses native node os package 
 * and check-disk-space https://www.npmjs.com/package/check-disk-space
 */
router.get('/info', (req, res) => {

    console.log("👉 GET /api/sys/info")

    child_process.exec('/bin/df "/"', function(err, stdout, stderr) {

        if (err) return res.json(err); 

        const df = stdout.split(/\s+/);
        const usedspace = parseInt(df[9]) * 1024;
        const availspace = parseInt(df[10]) * 1024;
        const totalspace = usedspace + availspace;
        const capacityspace = df[11];

        const freemem = os.freemem();
        const totalmem = os.totalmem();
        const hostname = os.hostname();
        const platform = os.platform();
        const release = os.release();

        const info = {
            freemem: freemem,
            totalmem: totalmem,
            usedspace: usedspace,
            availspace: availspace,
            totalspace: totalspace,
            capacityspace: capacityspace,
            hostname: hostname,
            platform: platform,
            release: release
        }

        return res.json(info);
    });

});

module.exports = router;
