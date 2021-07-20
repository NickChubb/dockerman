const express = require('express');
const { log } = require('../log.js');
const Docker = require('dockerode');

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// Returns all images from service.
router.get('/', (req,res) => {
    console.log("👉 GET /api/images");
    docker.listImages({all: true}).then(images => {return res.json(images)});
});

// Prunes all unused images in service.
router.delete('/prune', (req,res) => {
    console.log("👉 DELETE /api/images/prune");

    docker.pruneImages((err, data) => {
        if (!err) {
            log("✅ Successfully pruned images.");
        } else {
            log("🚫 Error pruning images: " + err.message);
        }
    }).then(images => {return res.json(images)});
});

module.exports = router;