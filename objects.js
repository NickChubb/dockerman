const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('express-http-proxy')
const Sequelize =  require('sequelize');
const moment = require('moment');
const { filterInPlace } = require('./lib/helpers.js');

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
        var now = moment();

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

        this.router = new Routes();
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
        service.save();

        console.log(`🗄🔄 Updated ${name} to served: ${served}, slug: ${slug}, port: ${port}.`);

        this.router = new Router();
        this.router.sync();
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
        var now = moment();

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

        this.db = new Database();
        this.db.sync();

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.use("/dockerman", express.static(path.join(__dirname + "/build")));
        this.app.use("/dockerman/api", require('./lib/api.js'));


        // this.app.get("/dockerman", (req, res) => {
        //             res.sendFile(__dirname + "/build/index.html");
        //         });

        this.app.get("/dockerman/*", (req, res) => {
            res.sendFile(__dirname + "/build/index.html");
        });

        this.sync();

        this.app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        });

        Router.instance = this;
    }

    /**
        Sync the routes served with the services from the db
     */
    sync() {

        // Filter out proxied services from the router stack
        this.app._router.stack.forEach( (layer, i) => {
            if (layer.name === 'handleProxy')
            {
                this.app._router.stack.splice(i, i + 1);
            }
        })

        // Add proxies from the db
        // Array is filtered for services being served, then sorted and reversed 
        // to make sure empty string is the last endpoint served.
        this.db.getServices().then( services => {
            services.filter( service => service.served)
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