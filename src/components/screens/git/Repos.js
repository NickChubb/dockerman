import Repo from './Repo.js';
import { Link } from 'react-router-dom';

const Repos = ({ repos }) => {
    return (
        <>
            {
                repos.length == 0
                ?
                <div className='container'>No Repos, <Link to={'/new'}>click here</Link> to add new Git Repository.</div> 
                : 
                repos.map((repo, i) => (
                    <Repo key={i} repo={repo} />
                ))
            }
        </>
    )
}

export default Repos;
