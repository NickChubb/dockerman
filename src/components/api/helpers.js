import { homepage } from '../../../package.json';

/**
 * General API request builder
 * 
 * Sends auth token from localstorage in request headers
 */
export const apiRequest = async (endpoint, method='GET', body=null, params=null) => {

    // Build URL + params
    let url = `${homepage}/api${endpoint}`;
    if (params) {
        url += `?` + new URLSearchParams(params);
    }

    // Stringify body
    if (body) {
        body = JSON.stringify(body);
    }

    // Build headers using token from localStorage
    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Authorization': 'Basic ' + Buffer.from(token).toString('base64'), 
        'Content-Type': 'application/json'
    });

    let res = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });

    return res;
}

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}