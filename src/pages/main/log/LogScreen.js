import Button from '../../../components/Button';
import { fetchLog, clearLog } from '../../../api/db.js';
import { useState, useEffect } from 'react';
import LogPanel from './LogPanel.js';

import './log.css';

const LogScreen = () => {

    const [ isBusy, setBusy ] = useState(true);
    const [ log, setLog ] = useState([]);

    // // Get logs from API and display Loading screen while waiting
    // const getLog = async () => {
    //     setBusy(true);
    //     const logFromServer = await fetchLog();
    //     setLog(logFromServer);
    //     setBusy(false);
    // }

    // useEffect(() => {
    //     getLog();
    // }, []);

    // // Handles clear logs button click
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
            <h3 className="topbar">
                <Button text="clear logs" onClick={() => onClearClick()} />
            </h3>
            {/* <Log log={log} isBusy={isBusy} /> */}
            <LogPanel fetchLog={fetchLog} />
        </>
    )
}

export default LogScreen;
