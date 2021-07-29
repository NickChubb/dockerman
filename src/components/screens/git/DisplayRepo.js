import Repos from './Repos.js';
import Button from '../../Button.js';
import Tabs from '../Tabs.js';
import { Link } from 'react-router-dom';

const DisplayRepo = () => {

    // const [repo, setRepo] = useState([]);

    // useEffect(() => {
    //     const getRepo = async () => {
    //         const repoFromServer = await fetchRepo();
    //         setRepo(repoFromServer);
    //     }

    //     getRepo();
    // }, []);
    const repos = [];

    return (
        <>
            <Tabs page="Git" />
            <h3 className="topbar">
                <Link to="/new">
                    <Button text="Add new Git repo" />
                </Link>
            </h3>
            <Repos repos={repos} />
        </>
    )
}

export default DisplayRepo;
