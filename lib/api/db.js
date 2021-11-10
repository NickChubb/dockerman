const { log } = require('../log.js');

const express = require('express');
const router = express.Router();

const Database = require('../database.js');
const db = new Database();

// Get service from db by id
router.get('/services/:name', (req,res) => {
    let name = req.params['name'];
    console.log(`👉 GET /api/db/services/${name}`);

    db.getService(name).then(service => {
        return res.json(service);
    });
});

// Update service
router.put('/services/:name', (req, res) => {

    let name = req.params['name'];
    let served = req.body.served;
    let slug = req.body.slug;
    let port = req.body.port;
    let priv = req.body.priv;

    console.log(`👉 PUT /api/db/services/${name} with parameters served: ${served}, slug: ${slug}, port: ${port}, priv: ${priv}`);

    db.updateService(name, served, slug, port, priv).then(( succ ) => {

        if ( succ ) {
            log(`🗄🔄 Updated service '${name}' to { served: ${served}, slug: ${slug}, port: ${port}, priv: ${priv} }`);
        } else {
            log(`🗄💥 Failed to updated service '${name}' to { served: ${served}, slug: ${slug}, port: ${port}, priv: ${priv} }`);
        }

        return res.sendStatus(200);
    });
});

/**
 * Get service logs from database
 * Returns: { logs: [], maxPage: int }
 * 
 * SEE: /lib/api/container.js -> router.get('/:containerId/log'...)
 * 
 */
router.get('/log', (req,res) => {

    // Get request queries
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    console.log(`👉 GET /api/db/log`);

    db.getLog().then(logs => {

        let startIndex = 0;
        let endIndex = logs.length;

        // Limit of 0 means no pagination
        if ( limit != 0) {
            startIndex = page * limit;
            endIndex = startIndex + limit;
        }

        // If endIndex would be greater than the length of the logs
        // set it to the length to prevent error
        if (endIndex > logs.length) {
            endIndex = logs.length;
        }

        const logPage = logs.slice(startIndex, endIndex);

        // Send logs and maxPage
        return res.status(200).send({
            logs: logPage,
            maxPage: Math.floor(logs.length / limit)
          });
    });
});

// Delete all logs from DB
router.delete('/log', (req, res) => {

    console.log(`👉 DELETE /api/db/log`);
    
    db.clearLog().then(response => {
        return res.json(response);
    });
});


module.exports = router;