const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('express-http-proxy')
const Sequelize =  require('sequelize');
const { DateTime } = require("luxon");

const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

class Database  {

    constructor() {

        // Get database
        this.sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            // SQLite only
            storage: 'data/database.sqlite',
        });

        /**
         *  Defines the database for the authentication token. 
         * 
         * 
         */
        this.token = this.sequelize.define('token', {
            token: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            ip: Sequelize.STRING,
            location: Sequelize.STRING
        })
        
        /*
        *   Defines the database for services (containers) to be served.
        *
        *   Services are added to the database the first time they are detected and the 
        *   port on which they are served are remembered across container restarts
        */
        this.services = this.sequelize.define('services', {
            name: {
                type: Sequelize.STRING,
                primaryKey: true
            }, // From Docker
            description: Sequelize.TEXT, // Not sure...
            path: Sequelize.STRING, // From Docker, absolute path of repo
            served: Sequelize.BOOLEAN, // From service -> Path being served
            slug: Sequelize.STRING, // From service -> slug to serve at
            port: Sequelize.STRING, // From service -> port to serve at slug
            created: Sequelize.DATE // 
        });

        /*
        *   Defines the database for log entries
        */
        this.log = this.sequelize.define('log', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            time: Sequelize.DATE,
            message: Sequelize.STRING
        });
    }

    /**
     * Sync collections with Database
     */
    sync() {
        this.services.sync();
        this.log.sync();
        this.token.sync();
    }

    /**
     * Get list of all services from Services collection in Database
     */
    async getServices() {
        const services = await this.services.findAll({ order: [['created', 'DESC']] });
        return services;
    }

    /**
     * Get list of all events from Events collection in Database
     */
    async getService(name) {
        const service = await this.services.findOne({ where: { name: name } });
        return service;
    }

    async addContainer(container) {
        
        let name = container.Names[0].substring(1);
        let description = "";
        let path = "";
        let served = false;
        let slug = '';
        let port = '';

        this.addService(name, description, path, served, slug, port)
            .catch(err => {
                console.log(`🗄💥 Container ${name} is already in db.`);
            });
    }

    /**
     * Add event to Events collection in Database
     */
    async addService(name, description, path, served, slug, port) {

        // Get date
        var now = DateTime.now();

        const newService = await this.services.create({
            name: name,
            description: description,
            path: path,
            served: served,
            slug: slug,
            port: port,
            created: now
        });

        console.log("🗄 Added new service to DB.");

        this.router = new Router();
        this.router.sync();

        return newService;
    }

    /**
        Update service description.
     */
    async updateDescription(name, description) {

        let service = await this.getService(name);
        service.description = description;
        service.save();

        console.log(`🗄🔄 Updated ${service.name} description to ${description}`);
    }

    /**
        Update service served, slug, and port fields.
        To be used when the form is changed.
     */
    async updateService(name, served, slug, port) {

        let service = await this.getService(name);
        service.served = served;
        service.slug = slug;
        service.port = port;

        await service.save().then(( res ) => {

            // Refresh Router
            this.router = new Router();
            this.router.sync();

        }).catch(( err ) => {
            console.log(err);
            return err;
        });

        return true;
    }

    /**
     * Remove event by ID from Events collection in Database
     */
    async deleteService(name) {
        const rowCount = await this.services.destroy({ where: { name: name } });
        if (!rowCount) return '```diff\n- ERROR: That event does not exist.\n```';

        console.log(`🗄❌ Removed service from DB.`);
        return '```diff\n+ Event successfully deleted.\n```';
    }

    // Adds new log entry to the log db
    async addLogEntry(message) {

        // get time
        var now = DateTime.now();

        const newLogEntry = await this.log.create({
            time: now,
            message: message
        });

        this.sync();
        return newLogEntry;
    }

    // Returns all log entries
    async getLog() {
        const log = await this.log.findAll({ order: [['time', 'DESC']] });
        return log;
    }

    // Deletes all log entries
    async clearLog() {
        const response = await this.log.destroy({
            where: {},
            truncate: true
          })
        return response;
    }

    /**
     * Iterate through all tokens and remove tokens which are 
     * older than 7 days
     * 
     * @TODO: Add config option which changes the expiration
     * time for tokens.
     */
    async refreshTokens() {
        const response = await this.token.destroy({
            where: {
                createdBy: {
                    $lte: DateTime.now().minus({days: 7})
                }
            }
        });

        console.log(`Refreshing tokens... Deleted ${response} tokens.`)
        return response;
    }

    /**
     * Add new token to DB, refresh old tokens.
     * 
     * @param {UUIDV4} token 
     * @param {String} ip 
     * @param {String} location 
     */
    async addToken(token, ip, location) {
        this.refreshTokens();
        
        const newToken = await this.token.create({
            token: token,
            ip: ip,
            location: location
        }).catch(err => {
            console.log(`🔑💥 Error adding ${token} to db.`);
            return false;
        });

        console.log("🔑✅ Added new token to DB.");

        return true;
    }

    /**
     * Validate token exists in Database.
     * 
     * @param {UUIDV4} token 
     * @returns true if token in DB
     */
    async validateToken (token) {
        // this.refreshTokens();

        const found = await this.token.findOne({
            where: { token: token } 
        });
        
        if (!found) {
            return false;
        }

        return true;
    } 
}

/**
    Router object manages the express router 
 */
class Router {

    constructor() {

        // Singleton design pattern
        if (Router.instance) { return Router.instance; }

        this.app = express();
        let port = 3050;

        // Get database
        this.db = new Database();
        this.db.sync();

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

module.exports = { Database, Router };