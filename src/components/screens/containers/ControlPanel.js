import ServeForm from './ServeForm'
import StatsField from './StatsField'
import Button from '../../Button'

const ControlPanel = ({ containerInfo, stats, ports }) => {

    // Container fields
    const name = containerInfo.Name.substring(1);
    const status = containerInfo.State.Status;

    return (
        
        <div className="log-area">

            <div className="topbar">
                <Button text="restart" />
                <Button text="stop" />
                <Button text="start" />
                <Button text="remove" />
            </div>

            <h4>State: {status}</h4>

            <h4>memory</h4>

            <h4>disk size</h4>
            

            <StatsField stats={stats} />

            {/* https://docs.docker.com/engine/api/v1.41/#operation/ContainerTop */}

            <ServeForm ports={ports} id={name} name={name} state={status} />
    
        </div>
    )
}

export default ControlPanel;