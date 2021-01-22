const express = require('express');
const stream = require('stream');
const Docker = require('dockerode');

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
  *  Returns an array of JSON objects, each corresponding to a running Docker container on server.
*/
router.get('/getContainers', (req,res) => {
    docker.listContainers().then(containers => {return res.json(containers)});
    console.log('👉 sent list of containers');
});

/**
  *  Returns a JSON container object corresponding to index.
*/
router.get('/getContainers/:containerIndex', (req, res) => {
    let index = req.params['containerIndex'];
    docker.listContainers().then(containers => {
        if (index < containers.length){

            // index in bounds, send container
            res.status(200);

            console.log('👉 sent container with index: ' + index);  
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

async function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

module.exports = router;