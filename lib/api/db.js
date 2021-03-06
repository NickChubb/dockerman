const express = require('express');
const { Database } = require('../../objects.js')

const router = express.Router();
const db = new Database();
db.sync();

// Get service from db by id
router.get('/services/:name', (req,res) => {
    let name = req.params['name'];
    console.log(`👉 GET /api/db/services/${name}`);

    db.getService(name).then(service => {
        return res.json(service);
    });
});

router.put('/services/:name', (req, res) => {

    let name = req.params['name'];
    let served = req.body.served;
    let slug = req.body.slug;
    let port = req.body.port;

    console.log(`👉 PUT /api/db/services/${name} with parameters served: ${served}, slug: ${slug}, port: ${port}`);

    db.updateService(name, served, slug, port);
});

module.exports = router;