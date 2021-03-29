#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const proxy = require('express-http-proxy')

const Database = require('./lib/db.js');

const app = express();
const port = "3050";

/**
 * Connect to Service DB
 */

 let db = new Database();
 db.sync();

/**
 * Express Routing
 */

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/build")));
app.use("/api", require('./lib/api.js'));

db.getServices().then( services => {
  services.filter( service => service.served)
          .forEach( service => {
              let port = service.port;
              let slug = service.slug;
              console.log('slug: ' + slug);
              console.log('port: ' + port);
              app.use('/' + slug, proxy('localhost:' + port))
          });
  app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
  })
})





/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
