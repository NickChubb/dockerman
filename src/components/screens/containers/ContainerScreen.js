import LogPanel from './LogPanel';
import ControlPanel from './ControlPanel';
import Button from '../../Button';
import { Link } from 'react-router-dom';

const ContainerScreen = ({ containerInfo, ports }) => {

    // Container fields
    const name = containerInfo.Name.substring(1);

    return (
        <>
            <div className="topbar">
                <Link to="/" className='back-link'>👈 Go Back</Link>
            </div>
            <div className='container'>

                <h2>{name}</h2>

                <ControlPanel containerInfo={containerInfo} ports={ports} />

                <LogPanel containerInfo={containerInfo} />

            </div>
        </>
    )
}

export default ContainerScreen;