import Repos from './Repos.js';
import Button from '../../Button.js';
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
            <h2>
                <Link to="/" className="unfocused">Containers</Link>
                <Link to="/images" className="unfocused">Images</Link>
                <span className="subpage-header">Repo</span>
                <Link to="/config" className="unfocused">Config</Link>
            </h2>
            <h3 className="topbar">
                <Button text="Add new Container" onClick={() => alert("adding new container")}/>
            </h3>
            <Repos repos={repos} />
        </>
    )
}

export default DisplayRepo;
