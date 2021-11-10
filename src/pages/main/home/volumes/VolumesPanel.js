import React from 'react';
import VolumesList from './VolumesList.js';
import Button from '../../../../components/Button.js';
import Loading from '../../../../components/Loading';
import { fetchContainers, pruneContainers, restartContainers, 
        stopContainers, startContainers } from '../../../../api/container';
import { useState, useEffect } from 'react';

/**
 * Volumes Side-bar Panel
 * Contains all volume button menu and list of volumes
 */
const VolumesPanel = () => {

    const [ loading, setLoading ] = useState(true);
    const [ volumes, setVolumes ] = useState([]);

    const getVolumes = async () => {
        setLoading(true);
        // const res = await fetchVolumes();
        // setVolumes(res);
        setLoading(false);
    }

    useEffect(() => {
        getVolumes();
    }, []);

    return (
        <>
            <h3 className="topbar">
                {/* <Button text="prune -a" onClick={() => pruneContainers().then(getContainers())} />
                <Button text="restart all" onClick={() => restartContainers().then(getContainers())} />
                <Button text="stop all" onClick={() => stopContainers().then(getContainers())} />
                <Button text="start all" onClick={() => startContainers().then(getContainers())} /> */}
                <Button text="Create New Volume" onClick={() => {alert("Coming soon...")}} />
            </h3>
            { loading ? (
                <Loading />
              ) : (
                // <Containers containers={containers} getContainers={getContainers}/>
                <VolumesList volumes={volumes} />
              )}
        </>
    )
}

export default VolumesPanel
