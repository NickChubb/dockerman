import LogPanel from './LogPanel';
import ControlPanel from './ControlPanel';
import StateAnimation from './StateAnimation';
import { Link } from 'react-router-dom';

const ContainerScreen = ({ containerInfo, ports }) => {

    // Container fields
    const name = containerInfo.Name.substring(1);
    const state = containerInfo.State.Status;

    return (
        <>
            <div className="topbar">
                <Link to="/" className='back-link'>👈 Go Back</Link>
            </div>
            <div className='container'>

                <h2 style={{ alignContent: 'center' }}>{name} <StateAnimation state={state} /></h2>

                <ControlPanel containerInfo={containerInfo} ports={ports} />

                <LogPanel containerInfo={containerInfo} />

            </div>
        </>
    )
}

export default ContainerScreen;