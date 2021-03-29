import { homepage } from '../../../package.json';

export const getService = async (id) => {

    let res = await fetch(`${homepage}/api/db/services/${id}`)
    let data = await res.json();
    
    return data;
}

export const updateService = async (id, served, slug, port) => {

    const update = {
        served: served,
        slug: slug,
        port: port 
    }

    let res = await fetch(`${homepage}/api/db/services/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    });

    return res.status;
}