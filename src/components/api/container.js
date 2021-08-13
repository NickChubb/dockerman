import { homepage } from '../../../package.json';

/**
 * Singular container endpoints
 */

// Fetch individual container from API based on ID and return it
export const fetchContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}`);
    let data = await res.json();
    return data;
}

// Fetch individual container from API based on ID and return its information
export const fetchContainerInfo = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/inspect`);
    let data = await res.json();
    return data;
}

// Fetch individual container logs form API based on ID
export const fetchContainerLogs = async (id, page=0, limit=0, timestamps=true) => {
    let res = await fetch(`${homepage}/api/containers/${id}/log?` + new URLSearchParams({
        page: page,
        limit: limit,
        timestamps: timestamps
    }));
    let data = await res.json();
    return data;
}

// Restart container by ID
export const restartContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/restart`, {
        method: 'POST'
    });
    return res.status;
}

// Start container by ID
export const startContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/start`, {
        method: 'POST'
    });
    return res.status;
}

// Stop container by ID
export const stopContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/stop`, {
        method: 'POST'
    });
    return res.status;
}

// Remove container by ID
export const removeContainer = async (id) => {
    let res = await fetch(`${homepage}/api/containers/${id}/remove`, {
        method: 'DELETE'
    });
    return res.status;
}

/**
 * Multi-Container endpoints
 */

// Fetch list of containers from API and return it
export const fetchContainers = async () => {
    let res = await fetch(`${homepage}/api/containers`);
    let data = await res.json();
    return data;
}

// Prune all unused containers
export const pruneContainers = async () => {
    let res = await fetch(`${homepage}/api/containers/prune`, {
        method: 'POST'
    });
    return res.status;
}

// Restart all containers
export const restartContainers = async () => {
    let res = await fetch(`${homepage}/api/containers/restart`, {
        method: 'POST'
    });
    return res.status;
}

// Start all containers
export const startContainers = async () => {
    let res = await fetch(`${homepage}/api/containers/start`, {
        method: 'POST'
    });
    return res.status;
}

// Stop all containers
export const stopContainers = async () => {
    let res = await fetch(`${homepage}/api/containers/stop`, {
        method: 'POST'
    });
    return res.status;
}