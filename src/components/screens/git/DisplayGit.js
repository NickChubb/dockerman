import Button from '../../Button.js';
import Tabs from '../Tabs.js';


const DisplayGit = () => {

    // const [repo, setRepo] = useState([]);

    // useEffect(() => {
    //     const getRepo = async () => {
    //         const repoFromServer = await fetchRepo();
    //         setRepo(repoFromServer);
    //     }

    //     getRepo();
    // }, []);
    // const repos = [];

    return (
        <>
            <Tabs page="Git" />
            <h3 className="topbar">
                <Button text="Add new Container" onClick={() => alert("adding new container")}/>
            </h3>
        </>
    )
}

export default DisplayGit;
