import { apiRequest } from './helpers.js';

// Fetch list of containers from API and return it
export const fetchImages = async () => {
    let res = await imageApiRequest('/', 'GET');
    let data = await res.json();
    return data;
}

export const pruneImages = async () => {

    let res = await imageApiRequest('/prune', 'DELETE');
    let data = await res.json();
    return data;
}

/**
 * Image API class call functions.  Extends general apiRequest method
 * from ./helpers.js
 * 
 * @param {string} endpoint '/URI'
 * @param {String} method GET, POST, PUT, DELETE, ETC
 * @param {Object} body 
 * @param {Object} params 
 * @returns 
 */
 export const imageApiRequest = async (endpoint, method, body, params) => {

    const reqEndpoint = `/images${endpoint}`;
    const res = await apiRequest(reqEndpoint, method, body, params);
    return res;
}