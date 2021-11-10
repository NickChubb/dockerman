import Containers from './Containers.js';
import Button from '../../../../components/Button.js';
import Loading from '../../../../components/Loading';
import { fetchContainers, pruneContainers, restartContainers, 
        stopContainers, startContainers } from '../../../../api/container';
import { useState, useEffect } from 'react';

import './containers.css';

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
                <Button text="prune -a" onClick={() => pruneContainers().then(getContainers())} />
                <Button text="restart all" onClick={() => restartContainers().then(getContainers())} />
                <Button text="stop all" onClick={() => stopContainers().then(getContainers())} />
                <Button text="start all" onClick={() => startContainers().then(getContainers())} />
            </h3>
            { isBusy ? (
                <Loading />
              ) : (
                <Containers containers={containers} getContainers={getContainers}/>
              )}
        </>
    )
}

export default DisplayContainers
