import Containers from './Containers.js';
import Button from '../../Button.js';
import { fetchContainers, pruneContainers, restartContainers, 
        stopContainers, startContainers } from '../../api/container';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';

const DisplayContainers = () => {

    const [containers, setContainers] = useState([]);

    useEffect(() => {
        const getContainers = async () => {
            const containersFromServer = await fetchContainers();
            setContainers(containersFromServer);
        }

        getContainers();
    }, []);

    return (
        <>
            <h3 className="topbar">
                <Button text="prune -a" onClick={() => pruneContainers()} />
                <Button text="restart all" onClick={() => restartContainers()} />
                <Button text="stop all" onClick={() => stopContainers()} />
                <Button text="start all" onClick={() => startContainers()} />
            </h3>
            <Containers containers={containers} />
        </>
    )
}

export default DisplayContainers
