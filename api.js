const express = require('express');
const stream = require('stream');
const Docker = require('dockerode');

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
 * Containers API
 */

router.post('/restartContainer/:containerId', (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    container.restart();
});

router.post('/startContainer/:containerId', (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    container.start();
    res.sendStatus(200);
});

router.post('/restartContainer/:containerId', (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    container.restart();
    res.sendStatus(200);
});

router.post('/stopContainer/:containerId', (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    container.stop();
    res.sendStatus(200);
});

router.delete('/removeContainer/:containerId', (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    container.remove();
    res.sendStatus(200);
});

router.get('/getContainer/:containerId', (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    res.send(container);
})

router.get('/getContainer/:containerId/inspect', async (req, res) => {
    let id = req.params['containerId'];
    let container = docker.getContainer(id);
    let response = await container.inspect();
    console.log("👉 GET /getContainerInfo/" + id);
    console.log("👈 RESPONSE : " + JSON.stringify(response));
    res.send(response);
})

/**
  *  Returns an array of JSON objects, each corresponding to a running Docker container on server.
*/
router.get('/getContainers', (req,res) => {
    console.log("👉 GET /getContainers");
    docker.listContainers({all: true}).then(containers => {return res.json(containers)});
});

/**
  *  Returns a JSON container object corresponding to index.
*/
router.get('/getContainers/:containerIndex', (req, res) => {
    let index = req.params['containerIndex'];
    console.log("👉 GET /getContainers/" + index);
    docker.listContainers().then(containers => {
        if (index < containers.length){

            // index in bounds, send container
            const response = containers[index];
            console.log("👈 RESPONSE : " + JSON.stringify(response));
            
            res.status(200);  
            return res.json(containers[index]);

        } else {

            // index out of bounds, send error message
            let errorMessage = '❗️ ERROR: index ' + index + ' out of range.';
            res.status(404).send(errorMessage);

            console.log(errorMessage);  
        } 
    });
})

/**
  *  Returns String of the logs from container corresponding to index.
*/
router.get('/getContainers/:containerIndex/log', (req, res) => {

  let index = req.params['containerIndex'];
  docker.listContainers().then(containers => {

    if (index >= containers.length){

      // index out of bounds, send error message
      let errorMessage = '❗️ ERROR: index ' + index + ' out of range.';
      res.status(404).send(errorMessage);
      console.log(errorMessage);

    } else {
      // index in bounds, get container id
      let containerId = containers[index]["Id"];
      let container = docker.getContainer(containerId);
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
    }
  });
})

/**
 * Images API
 */

router.get('/getImages', (req,res) => {
    console.log("👉 GET /getImages");
    docker.listImages({all: true}).then(images => {return res.json(images)});
});

router.delete('/pruneImages', (req,res) => {
    console.log("👉 DELETE /pruneImages");
    docker.pruneImages().then(images => {return res.json(images)});
});

/**
 * System API
 */

router.get('/getSystemInfo', (req,res) => {
    console.log("👉 GET /getSystemInfo");
    docker.df().then(info => {return res.json(info)});
});

router.get('/getDockerVersion', (req,res) => {
    console.log("👉 GET /getDockerVersion");
    docker.version().then(version => {return res.json(version)});
});

/**
 * Helpers
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