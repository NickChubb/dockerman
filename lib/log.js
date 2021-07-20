/*
    Functions for accessing log db
*/

const { Database } = require('../objects.js');

const db = new Database();
db.sync();

const log = (message) => {
    log(message, true);
}

/**
 * log method adds log message to log DB and logs message to console.
 * 
 * Takes log message and 
 */
const log = (message, success) => {

    console.log(message);
    db.addLogEntry(message);
}

module.exports = { log };