import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header class='header'>
            <Link to="..">
                <h1>DockerMan</h1>
            </Link>
        </header>
    )
}

export default Header
