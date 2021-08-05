import Button from '../../Button.js';
import { fetchLog, clearLog } from '../../api/db.js';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs.js';
import Log from './Log.js';

const DisplayLog = () => {

    const [ isBusy, setBusy ] = useState(true);
    const [ log, setLog ] = useState([]);

    // Get logs from API and display Loading screen while waiting
    const getLog = async () => {
        setBusy(true);
        const logFromServer = await fetchLog();
        setLog(logFromServer);
        setBusy(false);
    }

    useEffect(() => {
        getLog();
    }, []);

    // Handles clear logs button click
    const onClearClick = () => {
        clearLog().then((data) => {
            console.log('cleared logs');

            // Refresh logs displayed
            fetchLog().then(logs => {
                setLog(logs);
            });
        });
    }

    return (
        <>
            <Tabs page="Log" />
            <h3 className="topbar">
                <Button text="clear logs" onClick={() => onClearClick()} />
            </h3>
            <Log log={log} isBusy={isBusy} />
        </>
    )
}

export default DisplayLog;
