import { useHistory } from "react-router-dom";
import SystemInfo from './SystemInfo.js';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { BiCog } from 'react-icons/bi';
import { BsTerminalFill } from 'react-icons/bs';

const Header = () => {

    const history = useHistory();

    return (
        <header class='header'>
            <div class="header-title">
                <Link to="..">
                    <h1>DockerMan</h1>
                </Link>
                <div className="system-info">
                    <SystemInfo />
                </div>
            </div>
            <div class="system-nav">
                <Button title="logs" color="" text={<BsTerminalFill />} onClick={() => {history.push('/log')}}/>
                <Button title="config" color="" text={<BiCog />} onClick={() => {history.push('/config')}}/> 
            </div>
        </header>
    )
}

export default Header
