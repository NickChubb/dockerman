import Button from '../../Button';
import { useState, useEffect } from 'react';
import { startContainer, stopContainer, removeContainer,
         restartContainer, fetchContainerInfo } from '../../api/container';


const Status = ({ containerState, id }) => {

    const [state, setState] = useState(containerState);
    
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

    const getState = (state) => {
        console.log("state in getState: " + state);
        return state === 'running' ? '✅' : '🛑' ;
    }

    const stopOnClick = async (id) => {
        const expected = "exited";

        stopContainer(id);
        let status = await getContainerState(expected);

        if (status != expected) {
            setState("loading");
        } 
        while (status != expected) {
            status = await getContainerState(expected);
        }
    }

    const startOnClick = async (id) => {
        const expected = "running";

        startContainer(id); 
        let status = await getContainerState(expected);

        if (status != expected) {
            setState("loading");
        } 
        while (status != expected) {
            status = await getContainerState(expected);
        }
    }

    const removeOnClick = async (id) => {
        const expected = "running";

        removeContainer(id); 
        let status = await getContainerState(expected);

        if (status != expected) {
            setState(status);
        } 
        while (status == "removing") {
            status = await getContainerState(expected);
        }
    }

    const restartOnClick = async (id) => {
        const expected = "running";

        restartContainer(id); 
        let status = await getContainerState(expected);

        if (status != expected) {
            setState(status);
        }
        while (status == "restarting") {
            status = await getContainerState(expected);
        }
    }

    const setButton = (status, id) => {
        switch (status) {
            case 'running': 
                return (
                    <>
                        <Button color='red' text='stop' onClick={() => { stopOnClick(id) }} />
                        <Button color='blue' text='Restart' onClick={() => { restartOnClick(id) }} />
                    </>
                );
                break;
            case 'exited':
                return (
                    <>
                        <Button color='green' text='start' onClick={() => { startOnClick(id) }}/>
                        <Button color='black' text='remove' onClick={() => { removeOnClick(id) }}/>
                    </>
                );
                break;
            case 'loading':
                return (
                    <>
                        <Button color='grey' text='loading...' disabled={true} />
                        <Button color='blue' text='Restart' onClick={() => { restartOnClick(id) }} disabled={true}/>
                    </>
                );
                break;
            case 'removing':
                return (
                    <>
                        <Button color='grey' text='loading...' disabled={true} />
                    </>
                );
                break;
            default:
                return (
                    <>
                        <Button color='black' text='remove' onClick={() => { removeOnClick(id) }} />
                        <Button color='blue' text='Restart' onClick={() => { restartOnClick(id) }} />
                    </>
                );
                break;
        }
    }

    return (
        <>
            status: {getState(state)} <small>({state})</small>
            {setButton(state, id)}
        </>
    )
}

export default Status
