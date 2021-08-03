import { homepage } from '../../../package.json';

// Add new repo to the database
export const addRepo = async (name, url) => {

    let res = await fetch(`${homepage}/api/repo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, url: url})
    });

    return res;
}

// Get all repos from database
export const getRepos = async (name) => {
    
    let res = await fetch(`${homepage}/api/repo`);
    let data = await res.json();

    return data;
}

// Get repo from database
export const getRepo = async (name) => {
    
    let res = await fetch(`${homepage}/api/repo/${name}`);
    let data = await res.json();

    return data;
}

// Delete repo from database
export const deleteRepo = async (name) => {
    
    let res = await fetch(`${homepage}/api/repo/${name}`, {
        method: 'DELETE'
    });

    return res;
}

// Build repo
export const buildRepo = async (name) => {
    
    let res = await fetch(`${homepage}/api/repo/${name}/build`, {
        method: 'PUT'
    });

    return res;

}