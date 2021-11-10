import Button from '../../../../components/Button';
import StateField from './StateField';
import { useState, useEffect } from 'react';

// Container API
import {    startContainer, 
            stopContainer, 
            removeContainer,
            restartContainer, 
            fetchContainerInfo } from '../../../../api/container';

// Button Icons
import { MdDelete } from 'react-icons/md';
import { VscDebugRestart, VscDebugStart } from 'react-icons/vsc';
import { FiXOctagon } from 'react-icons/fi';



const Status = ({ containerState, id, getContainers }) => {

    // Set initial state to containerState
    const [state, setState] = useState(containerState);
    
    // Get container state 
    const getContainerState = async (expect = "") => {
        let container = await fetchContainerInfo(id);
        let status = container.State.Status;
        if (expect == "" || expect == status ){
            setState(status);
        }
        return status;
    }

    useEffect(() => {
        getContainerState();
    }, []);

    const handleStop = async (id) => {
        const expected = "exited";

        stopContainer(id);
        let status = await getContainerState(expected);

        if (status != expected) {
            setState("loading");
        } 
        while (status != expected) {
            status = await getContainerState(expected);
        }

        getContainers();
    }

    const handleStart = async (id) => {
        const expected = 'running';

        startContainer(id); 
        let status = await getContainerState(expected);

        if (status != expected) {
            setState("loading");
        } 
        while (status != expected) {
            status = await getContainerState(expected);
        }

        getContainers();
    }

    const handleRemove = async (id) => {
        const expected = "running";

        if (state == expected) {
            await stopContainer(id);
        }
        removeContainer(id); 
        let status = await getContainerState(expected);

        if (status != expected) {
            setState(status);
        } 
        while (status == "removing") {
            status = await getContainerState(expected);
        }

        getContainers();
    }

    /**
     * Handle restart button click
     */
    const handleRestart = async (id) => {
        const expected = "running";

        restartContainer(id); 
        let status = await getContainerState(expected);

        if (status != expected) {
            setState(status);
        }
        while (status == "restarting") {
            status = await getContainerState(expected);
        }

        getContainers();
    }

    // Define different button states
    const startButton = <Button 
                            color='grey' 
                            title='Start'
                            className="container-control-button"
                            text={<VscDebugStart />}
                            disabled={state=='loading' || state=='removing'}
                            onClick={() => { handleStart(id) }} />
    const stopButton = <Button 
                            color='grey'
                            title='Stop' 
                            className="container-control-button"
                            text={<FiXOctagon />} 
                            disabled={state=='loading' || state=='removing'}
                            onClick={() => { handleStop(id) }} />
    const restartButton = <Button 
                            color='grey' 
                            title='Restart' 
                            className="container-control-button"
                            text={<VscDebugRestart />} 
                            disabled={state=='loading' || state=='removing'}
                            onClick={() => { handleRestart(id) }} />
    const removeButton = <Button 
                            color='grey' 
                            title='Remove' 
                            className="container-control-button"
                            text={<MdDelete />} 
                            disabled={state=='loading' || state=='removing'}
                            onClick={() => { handleRemove(id) }} />

    return (
        <>
            <div className="button-container">
                {
                    state == 'running' ? 
                        stopButton
                        :
                        startButton
                }
                {restartButton}
                {removeButton}
            </div>
        </>
    )
}

export default Status
