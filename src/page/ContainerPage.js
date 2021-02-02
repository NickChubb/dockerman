import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchContainerInfo } from '../components/api/container';


const ContainerPage = () => {

    let { containerId } = useParams();
    let container = fetchContainerInfo(containerId).then((container) => {console.log(container)});

    return (
        <div className='display'>
            <h2>{containerId}</h2>
            <InfoField title="Ports" />
            <h3>Logs</h3>

        </div>
    )
}

export default ContainerPage;
