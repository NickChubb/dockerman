import Repos from './Repos.js';
import Button from '../../Button.js';
import { Link } from 'react-router-dom';
import { getRepos } from '../../api/repo.js';
import { useState, useEffect } from 'react';

const DisplayRepo = () => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const getRepo = async () => {
            const repoFromServer = await getRepos();
            setRepos(repoFromServer);
        }

        getRepo();
    }, []);

    return (
        <>
            <h3 className="topbar">
                <Link to="/git/new">
                    <Button text="Add new Git repo" />
                </Link>
            </h3>
            <Repos repos={repos} />
        </>
    )
}

export default DisplayRepo;
