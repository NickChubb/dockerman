import Button from '../../Button.js';
import { fetchLog, clearLog } from '../../api/db.js';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';
import Log from './Log.js';

const DisplayLog = () => {

    const [log, setLog] = useState([]);

    useEffect(() => {
        const getLog = async () => {
            const logFromServer = await fetchLog();
            setLog(logFromServer);
        }

        getLog();
    }, []);

    return (
        <>
            <Tabs page="Log" />
            <h3 className="topbar">
                <Button text="clear logs" onClick={() => clearLog()} />
            </h3>
            <Log log={log} />
        </>
    )
}

export default DisplayLog;
