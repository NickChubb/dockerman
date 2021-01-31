import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchContainer } from './api/container';


const ContainerPage = () => {

    let { containerId } = useParams();
    let container = fetchContainer(containerId);
    console.log(container);

    return (
        <div className='display'>
            <h2>{containerId}</h2>
        </div>
    )
}

export default ContainerPage;
