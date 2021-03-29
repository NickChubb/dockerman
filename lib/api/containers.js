const express = require('express');
const stream = require('stream');
const Docker = require('dockerode');
const Database = require('../db.js');

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const db = new Database();
db.sync();

/**
 * GET Requests
 */

// Returns an array of JSON objects, each corresponding to a Docker container.
router.get('/', (req,res) => {
  console.log("👉 GET /api/containers");
  docker.listContainers({all: true}).then(containers => {
      containers.forEach( container => {
        db.addContainer(container);
      });
      return res.json(containers)
    });
});

router.get('/:containerId', (req, res) => {
  let id = req.params['containerId'];
  let container = docker.getContainer(id);

  console.log("👉 GET /api/containers/" + id);
  console.log("👈 RESPONSE : " + JSON.stringify(container));
  
  res.status(200); 
  res.send(container);
})

router.get('/:containerId/inspect', async (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    let response = await container.inspect();

    console.log("👉 GET /api/containers/" + id + "/inspect");
    console.log("👈 RESPONSE : " + JSON.stringify(response));

    res.status(200); 
    res.send(response);
})

// Returns String of the logs from container corresponding to id.
router.get('/:containerId/log', (req, res) => {
  let id = req.params['containerId'];
  let container = docker.getContainer(containerId);

  console.log("👉 GET /api/containers/" + id + "/log");

  container.logs({
    follow: true,
    stdout: true,
    stderr: true
  }, function(err, stream){
    if(err) {
      return logger.error(err.message);
    }

    streamToString(stream).then( (response) => {
        res.status(200);
        res.send(response);
        console.log('👉 sent logs for container with index: ' + index);
      });

    setTimeout(function() {
      stream.destroy();
    }, 2000);
  })
})

router.get('/:containerId/ports', async (req, res) => {
  let id = req.params['containerId'];
  let container = docker.getContainer(id);
  const containerJson =  await container.inspect();
  const ports = containerJson.Config.HostConfig.bridge.IPAddress;

  console.log("👉 GET /api/containers/" + id + "/ports");
  console.log("👈 RESPONSE : " + JSON.stringify(ports));

  res.status(200); 
  res.send(ports);
})

/**
 * POST Requests
 */

router.post('/:containerId/start', (req, res) => {
    let id = req.params['containerId'];
    console.log("👉 POST /api/containers/" + id + "/start");
    let container = docker.getContainer(id);
    container.start();
    res.sendStatus(200);
});

router.post('/:containerId/stop', (req, res) => {
    let id = req.params['containerId'];
    console.log("👉 POST /api/containers/" + id + "/stop");
    let container = docker.getContainer(id);
    container.stop();
    res.sendStatus(200);
});

router.post('/:containerId/restart', (req, res) => {
    let id = req.params['containerId'];
    console.log("👉 POST /api/containers/" + id + "/restart");
    let container = docker.getContainer(id);
    container.restart();
    res.sendStatus(200);
});

/**
 * DELETE Requests
 */

router.delete('/:containerId/remove', (req, res) => {
    let id = req.params['containerId'];
    console.log("👉 DELETE /api/containers/" + id + "/remove");
    let container = docker.getContainer(id);
    container.remove();
    res.sendStatus(200);
});

/**
 * Helper Functions
 */

async function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

module.exports = router;