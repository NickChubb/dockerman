const express = require('express');
const Database = require('../db.js')

const router = express.Router();
const db = new Database();
db.sync();

// Get service from db by id
router.get('/services/:id', (req,res) => {
    let id = req.params['id'];
    console.log(`👉 GET /api/db/services/${id}`);

    db.getService(id).then(service => {
        return res.json(service);
    });
});

router.put('/services/:id', (req, res) => {

    let id = req.params['id'];
    let served = req.body.served;
    let slug = req.body.slug;
    let port = req.body.port;

    console.log(`👉 PUT /api/db/services/${id} with parameters served: ${served}, slug: ${slug}, port: ${port}`);

    db.updateService(id, served, slug, port);
});

module.exports = router;