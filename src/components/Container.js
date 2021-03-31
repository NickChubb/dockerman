import Button from './Button';
import Status from './Status';
import Serve from './Serve';
import { Link } from 'react-router-dom';

const Container = ({container, key}) => {

    const name = container.Names[0].substring(1);

    return (
        <div className='container'>
            <Link to={`/container/${name}`}>
                <h2>{name}</h2>
            </Link>
            <div className='container-controls'>
                <Status state={container.State} id={container.Id} />
                <Serve ports={container.Ports} id={container.Id} name={name} />
            </div>
        </div>
    )
}

// Container.defaultProps = {
//     title: 'Container',
// }

export default Container;
