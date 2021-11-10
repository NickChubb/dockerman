import { useState, useEffect } from 'react';
import Logs from './Logs';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import { fetchConfig } from '../../../api/system';
import './log.css';

const LogPanel = ({ fetchLog, id }) => {

    const [ isBusy, setBusy ]       = useState(true);
    const [ config, setConfig ]     = useState(null);
    const [ logs, setLogs ]         = useState(null);
    const [ maxPage, setMaxPage ]   = useState(null);
    const [ page, setPage ]         = useState(0);

    // Fetch logs
    const getLogs = async () => {
        setBusy(true);

        let configResponse = config;

        if (config == undefined) {

            configResponse = await fetchConfig();
            setConfig(configResponse);
        }

        const entriesPerPage = configResponse.log.entriesPerPage;

        let logsResponse = logs;

        // Fetch container logs and maxPage
        if (id) {
            logsResponse = await fetchLog(id, page, entriesPerPage);
        } else {
            logsResponse = await fetchLog(page, entriesPerPage);
        }

        setLogs(logsResponse.logs);
        setMaxPage(logsResponse.maxPage);
        setBusy(false);
    }

    // Get logs in response to a page change.
    useEffect(() => {
        getLogs();
    }, [page]);

    const handleNextClick = () => {

        // Stop if 
        if ( page < maxPage ) {
            setPage(page + 1);
        }
    }

    const handleBackClick = () => {

        // Don't want negative pages
        if ( page > 0 ) {
            setPage(page - 1);
        } 
    }

    return (
        <>
            <h2>Logs</h2>

            <div className='log-area' style={{
                // textAlign: 'left'
            }}>  
                {
                    isBusy ? (
                        <Loading />
                    ) : (
                        <Logs logs={logs} />
                    )
                }
            </div>

            <div className='log-controls'>
                <Button text="back" onClick={() => handleBackClick()} />
                <span>{page}</span>
                <Button text="next" onClick={() => handleNextClick()} />
            </div> 
        </>
    )
}

export default LogPanel;