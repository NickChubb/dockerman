import LogPanel from './LogPanel';
import Button from '../../Button';

const ContainerScreen = ({ containerInfo }) => {

    // Container fields
    const name = containerInfo.Name.substring(1);
    const status = containerInfo.State.Status;

    return (
        <>
            <h3 className="topbar">
                <Button text="restart" />
                <Button text="stop" />
                <Button text="start" />
                <Button text="remove" />
            </h3>
            <div className='container'>

                <h2>{name}</h2>

                <h3>{status}</h3>

                <LogPanel containerInfo={containerInfo} />

            </div>
        </>
    )
}

export default ContainerScreen;