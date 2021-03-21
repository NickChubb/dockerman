import Button from './Button';
import Status from './Status';
import Serve from './Serve';
import { Link } from 'react-router-dom';

const Container = ({container, key}) => {

    const name = container.Names[0].substring(1);

    const restart = (id) => {
        
    }

    return (
        <div className='container'>
            <Link to={`/container/${name}`}>
                <h2>{container.Names[0].substring(1)}</h2>
            </Link>
            <Status state={container.State} id={container.Id} />
            <Serve />
        </div>
    )
}

// Container.defaultProps = {
//     title: 'Container',
// }

export default Container;
