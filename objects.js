const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('express-http-proxy')
const Sequelize =  require('sequelize');
const moment = require('moment');

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
        * 
        */
        this.services = this.sequelize.define('services', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            }, // From Docker
            name: Sequelize.STRING, // From Docker
            description: Sequelize.TEXT, // Not sure...
            path: Sequelize.STRING, // From Docker, absolute path of repo
            served: Sequelize.BOOLEAN, // From service -> Path being served
            slug: Sequelize.STRING, // From service -> slug to serve at
            port: Sequelize.STRING, // From service -> port to serve at slug
            created: Sequelize.DATE // 
        });
    }

    /**
     * Sync collections with Database
     */
    sync() {
        this.services.sync();
    }

    /**
     * Get list of all services from Services collection in Database
     */
    async getServices() {
        const services = await this.services.findAll({ order: [['created', 'DESC']] });
        services.forEach(service => {
            console.log(`${service.name}, ${service.served}, ${service.slug}, ${service.port}`);
        })
        return services;
    }

    /**
     * Get list of all events from Events collection in Database
     */
    async getService(id) {
        const service = await this.services.findOne({ where: { id: id } });
        return service;
    }

    async addContainer(container) {
        
        let id = container.Id;
        let name = container.Names[0];
        let description = "";
        let path = "";
        let served = false;
        let slug = '';
        let port = '';

        this.addService(id, name, description, path, served, slug, port)
            .catch(err => {
                console.log(`🗄💥 Container ${name} is already in db.`);
            });
    }

    /**
     * Add event to Events collection in Database
     */
    async addService(id, name, description, path, served, slug, port) {

        // Get date
        var now = moment();

        const newService = await this.services.create({
            id: id,
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
        this.routes.sync();

        return newService;
    }

    /**
        Update service description.
     */
    async updateDescription(id, description) {

        let service = await this.getService(id);
        service.description = description;
        service.save();

        console.log(`🗄🔄 Updated ${service.name} description to ${description}`);
    }

    /**
        Update service served, slug, and port fields.
        To be used when the form is changed.
     */
    async updateService(id, served, slug, port) {

        let service = await this.getService(id);
        service.served = served;
        service.slug = slug;
        service.port = port;
        service.save();

        console.log(`🗄🔄 Updated ${service.name} to served: ${served}, slug: ${slug}, port: ${port}.`);

        this.router = new Routes();
        this.routes.sync();
    }

    /**
     * Remove event by ID from Events collection in Database
     */
    async deleteService(id) {
        const rowCount = await this.services.destroy({ where: { id: id } });
        if (!rowCount) return '```diff\n- ERROR: That event does not exist.\n```';

        console.log(`🗄❌ Removed service from DB.`);
        return '```diff\n+ Event successfully deleted.\n```';
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

        this.app.use(express.static(path.join(__dirname + "/build")));
        this.app.use("/api", require('./lib/api.js'));

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
        this.db.getServices().then( services => {
            services.filter( service => service.served)
                .forEach( service => {
                    let name = service.name;
                    let port = service.port;
                    let slug = service.slug;
                    console.log(`🕸 serving ${name} on port:${port} at nickchubb.ca/${slug}`);
                    this.app.use('/' + slug, proxy('localhost:' + port))
                });
                
                this.app.get("/*", (req, res) => {
                    res.sendFile(__dirname + "/build/index.html");
                })
        })
    }

}

module.exports = { Database, Router };