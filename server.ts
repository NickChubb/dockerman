#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const app = express();
const port = "3050";

/**
 * Express Routing
 */
 
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/build")));
app.use("/api", require('./api.js'));
app.use("/container", require('./container.js'));
app.use('/login', require('./login.js'));

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
})



/**
 * 
 */



/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
