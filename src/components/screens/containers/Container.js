import Button from '../../Button';
import Status from './Status';
import Serve from './Serve';
import { Link } from 'react-router-dom';

const Container = ({container, key}) => {

    const name = container.Names[0].substring(1);

    return (
        <div className='container'>
            <Link to={{ pathname: `/container/${name}`, state: container.Ports }}>
                <h2>{name}</h2>
            </Link>
            <div className='container-controls'>
                <Status state={container.State} id={name} />
                <Serve ports={container.Ports} id={name} name={name} />
            </div>
        </div>
    )
}

export default Container;
