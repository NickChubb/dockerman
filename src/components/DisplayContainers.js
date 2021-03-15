import Containers from './Containers.js';
import Button from './Button.js';
import { fetchContainers } from './api/container';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <h2>
                <span className="subpage-header">Containers</span>
                <Link to="/images" className="unfocused">Images</Link>
                <Link to="/repo" className="unfocused">Repo</Link>
            </h2>
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
