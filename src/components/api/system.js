import { homepage } from '../../../package.json';

// Fetch os info from API and return it
export const fetchInfo = async (debug=false) => {

    let res = await fetch(`${homepage}/api/sys/info`);
    let data = await res.json();

    if (debug) console.log(data);
    return data;
}

// Fetch system info (df) from API and return it
export const fetchSystemInfo = async (debug=false) => {
    let res = await fetch(`${homepage}/api/sys/systemInfo`);
    let data = await res.json();

    if (debug) console.log(data);
    return data;
}

// Fetch docker version from API and return it
export const fetchDockerVersion = async (debug=false) => {
    let res = await fetch(`${homepage}/api/sys/dockerVersion`);
    let data = await res.json();

    if (debug) console.log(data);
    return data;
}

// Fetch config JSON file from the server
export const fetchConfig = async (debug=false) => {
    let res = await fetch(`${homepage}/api/sys/config`);
    let data = await res.json();

    if (debug) console.log(data);
    return data;
}

// Set the config JSON file in the server
export const updateConfig = async (config) => {

    let res = await fetch(`${homepage}/api/sys/config`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
    });

    let data = await res.json();
    return data;
}

