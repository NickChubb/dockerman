import { apiRequest } from './helpers.js';

/**
 * Get service from DB based on name
 * @param {String} name 
 * @returns 
 */
export const getService = async (name) => {

    let res = await dbApiRequest(`/services/${name}`, 'GET');
    let data = await res.json();
    return data;
}

export const updateService = async ( update ) => {

    let res = await dbApiRequest(`/services/${update.name}`, 'PUT', update);
    let data = await res.json();
    return data;
}

/**
 * Fetch service logs
 * Uses page and limit parameters as query for log pagination
 * 
 * @returns log page
 */
export const fetchLog = async ( page=0, limit=0 ) => {

    const params = {
        page: page,
        limit: limit
    }

    let res = await dbApiRequest(`/log`, 'GET', null, params);
    let data = await res.json();
    return data;
}

/**
 * Clears service logs
 * @returns 
 */
export const clearLog = async () => {

    let res = await dbApiRequest(`/log`, 'DELETE');
    let data = await res.json();
    return data;
}

/**
 * Database API class call functions.  Extends general apiRequest method
 * from ./helpers.js
 * 
 * @param {string} endpoint '/URI'
 * @param {String} method GET, POST, PUT, DELETE, ETC
 * @param {Object} body 
 * @param {Object} params 
 * @returns 
 */
 export const dbApiRequest = async (endpoint, method, body, params) => {

    const reqEndpoint = `/db${endpoint}`;
    const res = await apiRequest(reqEndpoint, method, body, params);
    return res;
}