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

// Fetch docker version from API and return it
export const fetchConfig = async () => {
    let res = await fetch(`${homepage}/api/sys/config`);
    let data = await res.json();
    return data;
}

// Fetch docker version from API and return it
export const setConfig = async (config) => {

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