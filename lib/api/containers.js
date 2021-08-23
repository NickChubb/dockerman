const express = require('express');
const { log } = require('../log.js');
const stream = require('stream');
const Docker = require('dockerode');
const { DateTime } = require("luxon");

const Database = require('../database.js');
const db = new Database();

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

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

/**
 * Returns String of the logs from container corresponding to id.
 * 
 * Queries:
 *  - page (int)  -- which page to fetch
 *  - limit (int) -- how many entries per page
 *  - timestamps (bool) -- display timestamps on logs
 */
router.get('/:containerId/log', (req, res) => {

  // Get request parameters and query
  const id = req.params['containerId'];
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const timestamps = req.query.timestamps === 'true';

  // Get container from docker
  const container = docker.getContainer(id);

  console.log("👉 GET /api/containers/" + id + "/log");

  container.logs({
    follow: true,
    stdout: true,
    stderr: true,
    timestamps: timestamps
  }, (err, stream) => {
    if(err) {
      return logger.error(err.message);
    }

    streamToString(stream).then(( response ) => {

        // Split logs into lines and reverse so most recent logs are first
        const logs = response.split('\n').reverse();
        // Shift to remove the first element which is a garbage string
        logs.shift();

        let startIndex = 0;
        let endIndex = logs.length;

        // Limit of 0 means no pagination
        if ( limit != 0) {
          startIndex = page * limit;
          endIndex = startIndex + limit;
        }

        // If endIndex would be greater than the length of the logs
        // set it to the length to prevent error
        if (endIndex > logs.length) {
          endindex = logs.length;
        }

        const logPage = logs.slice(startIndex, endIndex).map(( log ) => {
          // Substring first 8 bytes from log which give info about log line...
          // See: https://docs.docker.com/engine/api/v1.28/#operation/ContainerAttach
          log = log.substring(8);

          // Get timestamp from first word in string
          const timestamp = log.replace(/ .*/,'');
          // Parse and format timestamp
          const dt = '> ' + DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_FULL);
          // Replace first word with formatted timestamp
          return log.replace(/[^\s]*/, dt);
        });
        
        return res.status(200).send({
          logs: logPage,
          maxPage: Math.floor(logs.length / limit)
        });
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

// Get specified container stats
router.get('/:containerId/stats', async (req, res) => {
  let id = req.params['containerId'];
  let container = docker.getContainer(id);
  let response = await container.stats({ stream: false });

  console.log("👉 GET /api/containers/" + id + "/stats");
  // console.log(response);
  // console.log("   👈 RESPONSE : " + JSON.stringify(response));

  //https://stackoverflow.com/questions/18857693/does-express-js-support-sending-unbuffered-progressively-flushed-responses

  return res.status(200).send(response);
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