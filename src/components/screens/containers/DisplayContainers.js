import Containers from './Containers.js';
import Button from '../../Button.js';
import { fetchContainers } from '../../api/container';
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
            <Tabs page="Containers" />
            <h3 className="topbar">
                <Button text="prune -a" />
                <Button text="restart all" />
                <Button text="stop all" />
                <Button text="start all" />
            </h3>
            <Containers containers={containers} />
        </>
    )
}

export default DisplayContainers
