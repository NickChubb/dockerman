import Button from '../../Button.js';
import { fetchLog, clearLog } from '../../api/db.js';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';
import Log from './Log.js';

const DisplayLog = () => {

    const [ isBusy, setBusy ] = useState(true);
    const [ log, setLog ] = useState([]);

    const getLog = async () => {
        setBusy(true);
        const logFromServer = await fetchLog();
        setLog(logFromServer);
        setBusy(false);
    }

    useEffect(() => {
        getLog();
    }, []);

    return (
        <>
            <Tabs page="Log" />
            <h3 className="topbar">
                <Button text="clear logs" onClick={() => clearLog()} />
            </h3>
            { isBusy ? (
                <div>loading...</div>
              ) : (
                <Log log={log} />
              )}
        </>
    )
}

export default DisplayLog;
