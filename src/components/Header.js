import SystemInfo from './SystemInfo.js';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header class='header'>
            <Link to="..">
                <h1>DockerMan</h1>
            </Link>
            <div className="system-info">
                <SystemInfo />
            </div>
        </header>
    )
}

export default Header
