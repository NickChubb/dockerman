#!/usr/bin/env node

const Database = require('./lib/database.js');
const Router = require('./router.js');

/**
 * Connect to Service DB
 */

 const db = new Database();
 
/**
 * Express Routing
 */

 const router = new Router();