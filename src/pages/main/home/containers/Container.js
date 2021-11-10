import React from 'react';
import Status from './Status';
import ServeForm from './ServeForm';
import StateAnimation from './StateAnimation';
import { Link } from 'react-router-dom';

const Container = ({container, key, getContainers}) => {

    const name = container.Names[0].substring(1);
    const state = container.State;
    const ports = container.Ports;

    return (
        <div className={'container-list-item container-' + state}>
            <div className='container-main'>
                <div className='container-header'>
                    <Link to={{ pathname: `/container/${name}`, state: ports }}>
                        <h2>{name}</h2>
                    </Link>
                    <StateAnimation state={state} />
                </div>
                <ServeForm ports={ports} id={name} name={name} state={state} />
            </div>
            <Status state={state} id={name} getContainers={getContainers} />
        </div>
    )
}

export default Container;
