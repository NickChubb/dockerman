import { apiRequest } from './helpers.js';

export const getService = async (name) => {

    let res = await dbApiRequest(`/services/${name}`, 'GET');
    let data = await res.json();
    return data;
}

export const updateService = async (name, served, slug, port, priv) => {

    const body = {
        served: served,
        slug: slug,
        port: port,
        priv: priv
    }

    let res = await dbApiRequest(`/services/${name}`, 'PUT', body);
    let data = await res.json();
    return data;
}

export const fetchLog = async () => {

    let res = await dbApiRequest(`/log`, 'GET');
    let data = await res.json();
    return data;
}

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