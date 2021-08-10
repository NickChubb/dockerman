const express = require('express');
const { log } = require('../log.js');
const stream = require('stream');
const Docker = require('dockerode');
const { Database } = require('../../objects.js')

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
  
  // List containers and add to DB
  docker.listContainers({all: true}).then(containers => {
      containers.forEach( container => {
        db.addContainer(container);
      });

      // Sort containers to return running containers at the top
      containers.sort((a, b) => {
        return ((b.State == 'running') - (a.State == 'running'))
      });

      return res.json(containers);
    });
});

// Get container by ID (or name)
router.get('/:containerId', (req, res) => {
  let id = req.params['containerId'];
  let container = docker.getContainer(id);

  console.log("👉 GET /api/containers/" + id);
  console.log("   👈 RESPONSE : " + JSON.stringify(container));
  
  res.status(200); 
  return res.send(container);
})

// Inspect specified container
router.get('/:containerId/inspect', async (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    let response = await container.inspect();

    console.log("👉 GET /api/containers/" + id + "/inspect");
    console.log("   👈 RESPONSE : " + JSON.stringify(response));

    res.status(200); 
    return res.send(response);
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
        console.log('👉 sent logs for container with index: ' + index);
        return res.send(response);
      });

    setTimeout(function() {
      stream.destroy();
    }, 2000);
  })
})

// Get ports from specified container
router.get('/:containerId/ports', async (req, res) => {
  let id = req.params['containerId'];
  let container = docker.getContainer(id);
  const containerJson =  await container.inspect();
  const ports = containerJson.Config.HostConfig.bridge.IPAddress;

  console.log("👉 GET /api/containers/" + id + "/ports");
  console.log("   👈 RESPONSE : " + JSON.stringify(ports));

  res.status(200); 
  return res.send(ports);
})

/**
 * POST Requests
 */

// Prune all containers


// Start all containers
router.post('/start', (req, res) => {

  console.log("👉 POST /api/containers/start");
  let error = false;

  docker.listContainers({all: true}).then(containers => {

    containers.forEach( container => {

      const id = container.Names[0].substring(1);
      const service = docker.getContainer(id);
      const success = startContainer(service,  id);
      if (!success) error = true;
    });

    if (error) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

// Start container by ID
router.post('/:containerId/start', (req, res) => {

    let id = req.params['containerId'];
    console.log("👉 POST /api/containers/" + id + "/start");

    let container = docker.getContainer(id);
    const success = startContainer(container, id);
    if (!success) return res.sendStatus(500);
    return res.sendStatus(200);
});

// Stop all containers
router.post('/stop', (req, res) => {

  console.log("👉 POST /api/containers/stop");
  let error = false;

  docker.listContainers({all: true}).then(containers => {

    containers.forEach( container => {

      const id = container.Names[0].substring(1);
      const service = docker.getContainer(id);
      const success = stopContainer(service,  id);
      if (!success) error = true;
    });

    if (error) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

// Stop container by ID
router.post('/:containerId/stop', (req, res) => {

    let id = req.params['containerId'];
    console.log("👉 POST /api/containers/" + id + "/stop");

    let container = docker.getContainer(id);
    const success = stopContainer(container, id);
    if (!success) return res.sendStatus(500);
    return res.sendStatus(200);
});

// Restart all containers
router.post('/restart', (req, res) => {

  console.log("👉 POST /api/containers/restart");
  let error = false;

  docker.listContainers({all: true}).then(containers => {

    containers.forEach( container => {

      const id = container.Names[0].substring(1);
      const service = docker.getContainer(id);
      const success = restartContainer(service, id);
      if (!success) error = true;
    });

    if (error) return res.sendStatus(500);
    return res.sendStatus(200);
  });
});

// Restart container by ID
router.post('/:containerId/restart', (req, res) => {

    let id = req.params['containerId'];
    console.log("👉 POST /api/containers/" + id + "/restart");

    let container = docker.getContainer(id);
    const success = restartContainer(container, id);
    if (!success) return res.sendStatus(500);
    return res.sendStatus(200);
});

/**
 * DELETE Requests
 */

router.delete('/:containerId/remove', (req, res) => {

    let id = req.params['containerId'];
    console.log("👉 DELETE /api/containers/" + id + "/remove");

    let container = docker.getContainer(id);
    container.remove((err, data) => {
      if (!err) {
        log(`📦🗑 Successfully removed container with id: ${id}.`);
        res.sendStatus(200);
      } else {
        log(`❗️📦🗑 Failed to remove container with id: ${id}.  ERROR: ${err.message}`);
        res.sendStatus(500);
      }
    });
});

/**
 * Helper Functions
 */

const startContainer = (container, id) => {

  container.start((err, data) => {
    if (!err) {
      log(`📦✅ Successfully started container with id: ${id}.`);
      return true;
    } else {
      log(`❗️📦✅ Failed to started container with id: ${id}.  ERROR: ${err.message}`);
      return false;
    }
  });

  return false;
}

const stopContainer = (container, id) => {

  container.stop((err, data) => {
    if (!err) {
      log(`📦🚫 Successfully stopped container with id: ${id}.`);
      return true;
    } else {
      log(`❗️📦🚫 Failed to stop container with id: ${id}.  ERROR: ${err.message}`);
      return false;
    }
  });

  return false;
}

const restartContainer = (container, id) => {

  container.restart((err, data) => {
    if (!err) {
      log(`📦🔄 Successfully restarted container with id: ${id}.`);
      return true;
    } else {
      log(`❗️📦🔄 Failed to restart container with id: ${id}.  ERROR: ${err.message}`);
      return false;
    }
  });

  return false;
}

async function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

module.exports = router;