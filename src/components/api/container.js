import { homepage } from '../../../package.json';

// Fetch individual container from API based on ID and return it
export const fetchContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Fetch individual container from API based on ID and return its information
export const fetchContainerInfo = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/inspect`);
    let data = await res.json();
    // console.log("GET /getContainerInfo = " + JSON.stringify(data));
    return data;
}

// Fetch list of containers from API and return it
export const fetchContainers = async () => {
    let res = await fetch(`${homepage}/api/containers`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Start container by ID
export const startContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/start`, {
        method: 'POST'
    });
    // console.log(res.status);
    return res.status;
}

// Stop container by ID
export const stopContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/stop`, {
        method: 'POST'
    });
    // console.log(res.status);
    return res.status;
}

// Remove container by ID
export const removeContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/remove`, {
        method: 'DELETE'
    });
    // console.log(res.status);
    return res.status;
}