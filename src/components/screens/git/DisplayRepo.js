import Repos from './Repos.js';
import Button from '../../Button.js';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';
import { getRepos } from '../../api/repo.js';
import { useState, useEffect } from 'react';

const DisplayRepo = () => {

    const [ isBusy, setBusy ] = useState(true);
    const [ repos, setRepos ] = useState([]);

    const getRepo = async () => {
        setBusy(true);
        const repoFromServer = await getRepos();
        setRepos(repoFromServer);
        setBusy(false);
    }

    useEffect(() => {
        getRepo();
    }, []);

    return (
        <>
            <h3 className="topbar">
                <Link to="/git/new">
                    <Button text="Add new Git repo" />
                </Link>
            </h3>
            { isBusy ? (
                <Loading />
              ) : (
                <Repos repos={repos} />
              )}
        </>
    )
}

export default DisplayRepo;
