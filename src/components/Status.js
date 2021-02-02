import Button from './Button';
import { useState, useEffect } from 'react';
import { startContainer, stopContainer, fetchContainerInfo } from './api/container';


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
            let status = await getContainerState(expected);
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

    const setButton = (status, id) => {
        switch (status) {
            case 'running': 
                return <Button color='red' text='stop' onClick={() => { stopOnClick(id) }} />;
                break;
            case 'exited':
                return <Button color='green' text='start' onClick={() => { startOnClick(id) }}/>
                break;
            case 'loading':
                return <Button color='grey' text='loading...' disabled={true} />
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
