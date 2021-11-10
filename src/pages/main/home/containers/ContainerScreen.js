import React from 'react';
import LogPanel from '../../log/LogPanel';
import ControlPanel from './ControlPanel';
import StateAnimation from './StateAnimation';
import { Link } from 'react-router-dom';
import { fetchContainerLogs } from '../../../../api/container';

const ContainerScreen = ({ containerInfo, stats, ports }) => {

    // Container fields
    const name = containerInfo.Name.substring(1);
    const state = containerInfo.State.Status;

    return (
        // <div className='main-screen'>
        <>
            {/* <div className="topbar">
                <Link to="/" className='back-link'>👈 Go Back</Link>
            </div> */}
            <div className='container'>

                <h2 style={{ alignContent: 'center' }}>{name} <StateAnimation state={state} /></h2>

                <ControlPanel containerInfo={containerInfo} stats={stats} ports={ports} />

                <LogPanel fetchLog={fetchContainerLogs} id={name}  />

            </div>
        </>
        // </div>
    )
}

export default ContainerScreen;