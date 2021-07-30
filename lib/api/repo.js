const express = require('express');
const { log } = require('../log.js');
const { Database } = require('../../objects.js');

// Create router
const router = express.Router();

// Sync database
const db = new Database();
db.sync();

// Add a repo to database
router.post('/', (req, res) => {

    const name = req.body.name;
    const url = req.body.url;
    console.log(`👉 POST /api/repo?name=${name},url=${url}`);

    // Verify name is legal

    // Verify repo has Dockerfile


    // Clone repo
    const path = '/var/lib/dockerman';

    // Update Dockerfile ports to not conflict

    // 

    // Add new repo to database
    try {
        const repo = db.addRepo(name, url);
        log(`🗄📥 Added new repo, ${repo} to DB.`)
        return 0;
    } catch (e) {
        console.error(e);
    }

    return 1; 
});

// Get all repos from database
router.get('/', (req, res) => {
    
    console.log(`👉 GET /api/repo`);

    try {
        db.getRepos().then(repos => {
            return res.json(repos);
        });
    } catch (e) {
        console.error(e);
    }

    return 1;
});

// Get repo from database
router.get('/:name', (req, res) => {

    let name = req.params['name'];
    console.log(`👉 GET /api/repo/${name}`);

    try {
        db.getRepo(name).then(repo => {
            return res.json(repo);
        });
    } catch (e) {
        console.error(e);
    }

    return 1;
});

// Delete repo from database
router.delete('/:name', (req, res) => {
    
    let name = req.params['name'];
    console.log(`👉 DELETE /api/repo/${name}`);

    // Delete repo from database
    try {
        db.deleteRepo(name).then((res) => {
            log(`🗄❌ Removed repo with name ${name} from DB.`);
        });
    } catch (e) {
        console.error(e);
    }

    // Remove repo folder from git directory

});

// (re)Build container from repo
router.put('/:name/build', (req, res) => {
    
    let name = req.params['name'];
    console.log(`👉 GET /api/repo/${name}/build`);

    // Stop container with name

    // Remove container with name

    // Build container with name from Dockerfile

    // Run image

});

module.exports = router;