import Status from './Status';
import ServeForm from './ServeForm';
import { Link } from 'react-router-dom';

const Container = ({container, key, getContainers}) => {

    const name = container.Names[0].substring(1);
    const state = container.State;
    const ports = container.Ports;

    return (
        <div className={'container container-' + state}>
            <Link to={{ pathname: `/container/${name}`, state: ports }}>
                <h2>{name}</h2>
            </Link>
            <div className='container-controls'>
                <Status state={state} id={name} getContainers={getContainers} />
                <ServeForm ports={ports} id={name} name={name} state={state} />
            </div>
        </div>
    )
}

export default Container;
