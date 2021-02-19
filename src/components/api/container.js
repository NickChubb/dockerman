import { homepage } from '../../../package.json';

// Fetch individual container from API based on ID and return it
export const fetchContainer = async (id) => {
    let res = await fetch(`${homepage}/api/getContainer/${id}`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Fetch individual container from API based on ID and return its information
export const fetchContainerInfo = async (id) => {
    let res = await fetch(`${homepage}/api/getContainer/${id}/inspect`);
    let data = await res.json();
    // console.log("GET /getContainerInfo = " + JSON.stringify(data));
    return data;
}

// Fetch list of containers from API and return it
export const fetchContainers = async () => {
    let res = await fetch(`${homepage}/api/getContainers`);
    let data = await res.json();
    // console.log(data);
    return data;
}

// Start container by ID
export const startContainer = async (id) => {
    let res = await fetch(`${homepage}/api/startContainer/${id}`, {
        method: 'POST'
    });
    // console.log(res.status);
    return res.status;
}

// Stop container by ID
export const stopContainer = async (id) => {
    let res = await fetch(`${homepage}/api/stopContainer/${id}`, {
        method: 'POST'
    });
    // console.log(res.status);
    return res.status;
}

// Remove container by ID
export const removeContainer = async (id) => {
    let res = await fetch(`${homepage}/api/removeContainer/${id}`, {
        method: 'DELETE'
    });
    // console.log(res.status);
    return res.status;
}