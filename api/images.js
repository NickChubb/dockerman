const express = require('express');

const router = express.Router();

/**
 * Returns all images from service.
 */
router.get('/get', (req,res) => {
    console.log("👉 GET /api/image/get");
    docker.listImages({all: true}).then(images => {return res.json(images)});
});

/**
 * Prunes all unused images in service.
 */
router.delete('/prune', (req,res) => {
    console.log("👉 DELETE /api/image/prune");
    docker.pruneImages().then(images => {return res.json(images)});
});

module.exports = router;