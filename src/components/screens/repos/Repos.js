import Repo from './Repo.js';
import { Link } from 'react-router-dom';

const Repos = ({ repos }) => {
    return (
        <>
            {
                repos && repos.legth != 0
                ?
                <div className='container'>No Containers, <Link to={'/new'}>click here</Link> to add new Container.</div> 
                : 
                repos.map((repo, i) => (
                    <Repo key={i} repo={repo} />
                ))
            }
        </>
    )
}

export default Repos;
