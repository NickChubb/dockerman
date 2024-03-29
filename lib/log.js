/*
    Functions for accessing log db
*/

const Database = require('./database.js');
const db = new Database();

function log(message) {
    log(message, true);
}

/**
 * log method adds log message to log DB and logs message to console.
 * 
 * Takes log message and 
 */
function log(message, success) {

    console.log(message);
    db.addLogEntry(message);
}

module.exports = { log };