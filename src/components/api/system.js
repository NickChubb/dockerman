import { homepage } from '../../../package.json';

// Fetch system info (df) from API and return it
export const fetchSystemInfo = async () => {
    let res = await fetch(`${homepage}/api/getSystemInfo`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Fetch docker version from API and return it
export const fetchDockerVersion = async () => {
    let res = await fetch(`${homepage}/api/getDockerVersion`);
    let data = await res.json();
    // console.log(data);
    return data;
}
