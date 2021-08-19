import { apiRequest } from './helpers.js';

/**
 * Singular container endpoints
 */

// Fetch individual container from API based on ID and return it
export const fetchContainer = async (id) => {

    let res = await containerApiRequest(`/${id}`, 'GET');
    let data = await res.json();
    return data;
}

// Fetch individual container from API based on ID and return its information
export const fetchContainerInfo = async (id) => {

    let res = await containerApiRequest(`/${id}/inspect`, 'GET');
    let data = await res.json();
    return data;
}

// Fetch individual container from API based on ID and return its stats
export const fetchContainerStats = async (id) => {

    let res = await containerApiRequest(`/${id}/stats`, 'GET');
    let data = await res.json();
    return data;
}

// Fetch individual container logs form API based on ID
export const fetchContainerLogs = async ( id, page=0, limit=0, timestamps=true ) => {

    const params = {
        page: page,
        limit: limit,
        timestamps: timestamps
    }

    let res = await containerApiRequest(`/${id}/log`, 'GET', null, params);
    let data = await res.json();
    return data;
}

// Restart container by ID
export const restartContainer = async (id) => {

    let res = await containerApiRequest(`/${id}/restart`, 'POST');
    let data = await res.json();
    return data;
}

// Start container by ID
export const startContainer = async (id) => {

    let res = await containerApiRequest(`/${id}/start`, 'POST');
    let data = await res.json();
    return data;
}

// Stop container by ID
export const stopContainer = async (id) => {

    let res = await containerApiRequest(`/${id}/stop`, 'POST');
    let data = await res.json();
    return data;
}

// Remove container by ID
export const removeContainer = async (id) => {

    let res = await containerApiRequest(`/${id}/remove`, 'DELETE');
    let data = await res.json();
    return data;
}

/**
 * Multi-Container endpoints
 */

// Fetch list of containers from API and return it
// export const fetchContainers = async () => {
//     let res = await fetch(`${homepage}/api/containers`);
//     let data = await res.json();
//     return data;
// }
export const fetchContainers = async () => {

    let res = await containerApiRequest('/');
    let data = await res.json();
    return data;
}

// Prune all unused containers
export const pruneContainers = async () => {

    let res = await containerApiRequest('/prune', 'POST');
    let data = await res.json();
    return data;
}

// Restart all containers
export const restartContainers = async () => {
    
    let res = await containerApiRequest('/restart', 'POST');
    let data = await res.json();
    return data;
}

// Start all containers
export const startContainers = async () => {

    let res = await containerApiRequest('/start', 'POST');
    let data = await res.json();
    return data;
}

// Stop all containers
export const stopContainers = async () => {

    let res = await containerApiRequest('/stop', 'POST');
    let data = await res.json();
    return data;
}

/**
 * Container API class call functions.  Extends general apiRequest method
 * from ./helpers.js
 * 
 * @param {string} endpoint '/URI'
 * @param {String} method GET, POST, PUT, DELETE, ETC
 * @param {Object} body 
 * @param {Object} params 
 * @returns 
 */
export const containerApiRequest = async (endpoint, method, body, params) => {

    const reqEndpoint = `/containers${endpoint}`;
    const res = await apiRequest(reqEndpoint, method, body, params);
    return res;
}