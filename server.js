#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('express-http-proxy')

const {Router, Database} = require('./objects.js');

/**
 * Connect to Service DB
 */

 const db = new Database();
 db.sync();

/**
 * Express Routing
 */

 const router = new Router();