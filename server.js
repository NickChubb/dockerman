#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('express-http-proxy')

const {Router, Database} = require('./objects.js');

/**
 * Connect to Service DB
 */

 let db = new Database();
 db.sync();

/**
 * Express Routing
 */

let routes = new Router();
