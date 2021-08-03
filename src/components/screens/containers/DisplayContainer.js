import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchContainerInfo } from '../../api/container';
import Button from '../../Button';

const ContainerPage = () => {

    let { id } = useParams();
    let container = fetchContainerInfo(id).then((container) => {console.log(container)});

    return (
        <>  
            <h3 className="topbar">
                <Button text="restart" />
                <Button text="stop" />
                <Button text="start" />
                <Button text="remove" />
            </h3>
            <div className='container'>

                <h2>{id}</h2>

                {/* <InfoField title="Ports" /> */}
                {/* <h3>Logs</h3> */}

            </div>
        </>
    )
}

export default ContainerPage;
