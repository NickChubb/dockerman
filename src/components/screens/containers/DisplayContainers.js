import Containers from './Containers.js';
import Button from '../../Button.js';
import { fetchContainers, pruneContainers, restartContainers, 
        stopContainers, startContainers } from '../../api/container';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';

const DisplayContainers = () => {


    const [ isBusy, setBusy ] = useState(true);
    const [ containers, setContainers ] = useState([]);

    const getContainers = async () => {
        setBusy(true);
        const containersFromServer = await fetchContainers();
        setContainers(containersFromServer);
        setBusy(false);
    }

    useEffect(() => {
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
            { isBusy ? (
                <div>loading...</div>
              ) : (
                <Containers containers={containers} />
              )}
        </>
    )
}

export default DisplayContainers
