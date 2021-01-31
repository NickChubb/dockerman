import Containers from './Containers.js';
import { useState, useEffect } from 'react';
import { fetchContainers } from './api/container';

const Display = () => {

    const [containers, setContainers] = useState([]);

    useEffect(() => {
        const getContainers = async () => {
            const containersFromServer = await fetchContainers();
            setContainers(containersFromServer);
        }

        getContainers();
    }, []);

    return (
        <div className='display'>
            <Containers containers={containers} />
        </div>
    )
}

export default Display
