import { homepage } from '../../../package.json';

// Fetch list of containers from API and return it
export const fetchImages = async () => {
    let res = await fetch(`${homepage}/api/images`);
    let data = await res.json();
    // console.log(data);
    return data;
}

export const pruneImages = async () => {
    let res = await fetch(`${homepage}/api/images/prune`, {
        method: 'DELETE'
    });
    // console.log(data);
    return res.status;
}