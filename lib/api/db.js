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

    console.log(`👉 PUT /api/db/services/${name} with parameters served: ${served}, slug: ${slug}, port: ${port}`);

    db.updateService(name, served, slug, port).then(( succ ) => {

        if ( succ ) {
            log(`🗄🔄 Updated service '${name}' to { served: ${served}, slug: ${slug}, port: ${port} }`);
        } else {
            log(`🗄💥 Failed to updated service '${name}' to { served: ${served}, slug: ${slug}, port: ${port} }`);
        }

        return res.sendStatus(200);
    });
});

// Get log from db
router.get('/log', (req,res) => {

    console.log(`👉 GET /api/db/log`);

    db.getLog().then(service => {
        return res.json(service);
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