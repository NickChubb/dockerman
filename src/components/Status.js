import Button from './Button';

const Status = ({ state, id }) => {

    const startContainer = async (id) => {
        let res = await fetch(`./api/startContainer/${id}`, {
            method: 'POST'
        });
        console.log(res.status);
        return res.status;
    }

    const stopContainer = async (id) => {
        let res = await fetch(`./api/stopContainer/${id}`, {
            method: 'POST'
        });
        console.log(res.status);
        return res.status;
    }

    const getState = (state) => {
        return state === 'running' ? '✅' : '🛑' ;
    }

    const setButton = (state, id) => {
        return state === 'running' ? <Button color='red' text='stop' onClick={stopContainer} /> 
                                    : <Button color='green' text='start' onClick={startContainer}/>
    }

    return (
        <>
            status: {getState(state)} <small>({state})</small>
            {setButton(state, id)}
        </>
    )
}

export default Status
