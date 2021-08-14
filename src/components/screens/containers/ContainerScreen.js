import LogPanel from './LogPanel';
import Button from '../../Button';
import { Link } from 'react-router-dom';

const ContainerScreen = ({ containerInfo }) => {

    // Container fields
    const name = containerInfo.Name.substring(1);
    const status = containerInfo.State.Status;

    return (
        <>
            <div className="topbar">
                <Link to="/" className='back-link'>👈 Go Back</Link>
                <Button text="restart" />
                <Button text="stop" />
                <Button text="start" />
                <Button text="remove" />
            </div>
            <div className='container'>

                <h2>{name}</h2>

                <h3>{status}</h3>

                <LogPanel containerInfo={containerInfo} />

            </div>
        </>
    )
}

export default ContainerScreen;