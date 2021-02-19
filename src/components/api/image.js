import { homepage } from '../../../package.json';

// Fetch list of containers from API and return it
export const fetchImages = async () => {
    let res = await fetch(`${homepage}/api/getImages`);
    let data = await res.json();
    // console.log(data);
    return data;
}