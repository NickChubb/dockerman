const Sequelize =  require('sequelize');
const { DateTime } = require("luxon");

/**
 * Backend SQLite3 database class
 */
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
            priv: Sequelize.BOOLEAN, 
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

        this.sync();
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
        let priv = false;

        this.addService(name, description, path, served, slug, port, priv)
            .catch(err => {
                console.log(`🗄💥 Container ${name} is already in db.`);
            });
    }

    /**
     * Add event to Events collection in Database
     */
    async addService(name, description, path, served, slug, port, priv) {

        // Get date
        var now = DateTime.now();

        const newService = await this.services.create({
            name: name,
            description: description,
            path: path,
            served: served,
            slug: slug,
            port: port,
            priv: priv,
            created: now
        });

        console.log("🗄 Added new service to DB.");

        const Router = require('../router');
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
    async updateService(name, served, slug, port, priv) {

        let service = await this.getService(name);
        service.served = served;
        service.slug = slug;
        service.port = port;
        service.priv = priv;

        await service.save().then(( res ) => {

            // Refresh Router
            const Router = require('../router');
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

module.exports = Database;