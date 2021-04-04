import { homepage } from '../../../package.json';

export const getService = async (name) => {

    let res = await fetch(`${homepage}/api/db/services/${name}`)
    let data = await res.json();
    
    return data;
}

export const updateService = async (name, served, slug, port) => {

    const update = {
        served: served,
        slug: slug,
        port: port 
    }

    let res = await fetch(`${homepage}/api/db/services/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    });

    return res.status;
}