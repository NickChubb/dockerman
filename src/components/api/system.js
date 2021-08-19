import { apiRequest } from './helpers.js';

// Fetch os info from API and return it
export const fetchInfo = async (debug=false) => {
    const data = await systemApiRequest(`/info`, 'GET');
    return data;
}

// Fetch system info (df) from API and return it
export const fetchSystemInfo = async (debug=false) => {
    const data = await systemApiRequest(`/systemInfo`, 'GET');
    return data;
}

// Fetch docker version from API and return it
export const fetchDockerVersion = async (debug=false) => {
    const data = await systemApiRequest('/dockerVersion', 'GET');
    return data;
}

// Fetch config JSON file from the server
export const fetchConfig = async (debug=false) => {
    const data = await systemApiRequest('/config', 'GET');
    return data;
}

// Set the config JSON file in the server
export const updateConfig = async (config, debug=false) => {
    const data = await systemApiRequest('/config', 'POST', config);
    return data;
}

/**
 * System API class call functions.  Extends general apiRequest method
 * from ./helpers.js
 * 
 * @param {string} endpoint '/URI'
 * @param {String} method GET, POST, PUT, DELETE, ETC
 * @param {Object} body 
 * @param {Object} params 
 * @returns 
 */
 export const systemApiRequest = async (endpoint, method, body, params, debug=false) => {
    const reqEndpoint = `/sys${endpoint}`;
    const res = await apiRequest(reqEndpoint, method, body, params);
    
    const data = await res.json();

    if (debug) console.log(data);
    return data;
}