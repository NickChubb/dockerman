import { homepage } from '../../../package.json';

// Fetch system info (df) from API and return it
export const fetchSystemInfo = async () => {
    let res = await fetch(`${homepage}/api/sys/systemInfo`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Fetch docker version from API and return it
export const fetchDockerVersion = async () => {
    let res = await fetch(`${homepage}/api/sys/dockerVersion`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Fetch config JSON file from the server
export const fetchConfig = async () => {
    let res = await fetch(`${homepage}/api/sys/config`);
    let data = await res.json();
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