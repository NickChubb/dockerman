import Button from '../../Button.js';
import { deleteRepo, buildRepo } from '../../api/repo.js';

const Repo = ({ key, repo }) => {
    return (
        <div className='container'>
            <h4>{repo.name}</h4>
            <h5>{repo.url}</h5>
            <Button text="(re)build" onClick={() => buildRepo(repo.name)} />
            <Button text="remove" onClick={() => deleteRepo(repo.name)} />
        </div>
    )
}

export default Repo;
