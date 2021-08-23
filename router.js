const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('express-http-proxy')
const Config = require('./lib/config.js');
const Database = require('./lib/database.js');

const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
    Router object manages the express router 
 */
class Router {

    constructor() {

        // Singleton design pattern
        if (Router.instance) { return Router.instance; }

        this.app = express();
        // Get database
        this.db = new Database();
        this.db.sync();

        this.config = new Config();
        let port = this.config.dockerman.port;

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        // Routes for GUI and API
        this.app.use("/dockerman", express.static(path.join(__dirname + "/build")));
        this.app.use("/dockerman/api", require('./lib/api.js'));
        this.app.get("/dockerman/*", (req, res) => {
            res.sendFile(__dirname + "/build/index.html");
        });

        // Sync served services
        this.sync();

        // Listen at port
        this.app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        });

        Router.instance = this;
    }

    /**
        Sync the routes served with the services from the db
    */
    async sync() {

        // Filter out proxied services from the router stack
        this.app._router.stack.forEach( (layer, i) => {
            if (layer.name === 'handleProxy')
            {
                this.app._router.stack.splice(i, i + 1);
            }
        })

        // We only want to serve running containers, so get 
        // List of currently running containers to filter out the stopped ones.
        let runningContainers = [];
        await docker.listContainers().then(containers => {
            containers.forEach( container => {
                const name = container.Names[0].substring(1);
                runningContainers.push(name);
            });
        });

        // Add proxies from the db
        // Array is filtered for services being served, then sorted and reversed 
        // to make sure empty string is the last endpoint served.
        this.db.getServices().then( services => {
            services.filter( service => (service.served && runningContainers.includes(service.name)) )
                .sort()
                .reverse()
                .forEach( service => {
                    console.log(`🕸 serving ${service.name} on port:${service.port} at nickchubb.ca/${service.slug}`);  
                    this.app.use('/' + service.slug, proxy('localhost:' + service.port))
                });
        })
    }

}
    
module.exports = Router;