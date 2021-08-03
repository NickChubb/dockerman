const express = require('express');
// const Git = require("nodegit");
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
    if (!name.match(/^\w+$/)) return res.status(400).send({
        error: {
            message: `Could not add repo with name '${name}'.`,
            err: `Name can only contain alphanumeric values or '_'.`
        }
    });

    // Clone repo
    const path = '/var/lib/dockerman';
    

    // Verify repo has Dockerfile
    

    // Update Dockerfile ports to not conflict

    // 

    // Add new repo to database
    
    db.addRepo(name, url).then( repo => {
        log(`🗄📥 Added new repo {name: '${name}', url: '${url}'} to DB.`);
        return res.sendStatus(200);
    }).catch( e => {
        return res.status(500).json({ error: e }).send();
    })
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

    // Remove repo folder from git directory
    // before deleting repo from database incase
    // error happens while deleting won't leave
    // orphaned directories.



    // Delete repo from database
    try {
        db.deleteRepo(name).then((res) => {
            log(`🗄❌ Removed repo with name ${name} from DB.`);
            return 0;
        });
    } catch (e) {
        console.error(e);
    }
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