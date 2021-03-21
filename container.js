const express = require('express');
const stream = require('stream');
const Docker = require('dockerode');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

router.use(cors());

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
  *  Returns an array of JSON objects, each corresponding to a running Docker container on server.
*/

// router.get('/:containerId', (req, res) => {
//     let id = req.params['containerId'];
//     let container = docker.getContainer(id);

//     res.send(container);
    
// })

const getContainerUi = async (containerId) => {
    let container = docker.getContainer(id);
    console.log(container);
    const containerJson =  await container.inspect();
    const port = containerJson.Config.HostConfig.bridge.IPAddress;

    return `localhost:${port}`;
}

// router.use('/:containerId/:port', proxy(getContainerUi);

// {
//     // let id = req.params['containerId'];
//     let port = req.params['port']
//     // let container = docker.getContainer(id);
//     // console.log(container);
//     // console.log(container.stats());
//     // container.inspect().then(stats => console.log(stats));
//     // const containerJson =  await container.inspect();
//     // const ip = containerJson.NetworkSettings.Networks.bridge.IPAddress;
//     // console.log('IP: ' + ip + ":" + port);
//     return proxy(`localhost:${port}`);
// })

module.exports = router;