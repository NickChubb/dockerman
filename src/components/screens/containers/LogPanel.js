import { useState, useEffect } from 'react';
import Logs from './Logs';
import Loading from '../../Loading';
import Button from '../../Button';
import { fetchContainerLogs } from '../../api/container';
import { fetchConfig } from '../../api/system';
import '../log/log.css';

const LogPanel = ({ containerInfo }) => {

    const [ isBusy, setBusy ] = useState(true);
    const [ config, setConfig ] = useState(null);
    const [ logs, setLogs ] = useState(null);
    const [ maxPage, setMaxPage ] = useState(null);
    const [ page, setPage ] = useState(0);

    const name = containerInfo.Name.substring(1);

    // Fetch logs
    const getLogs = async (id) => {
        setBusy(true);

        let configResponse = config;

        if (config == undefined) {
            configResponse = await fetchConfig();
            setConfig(configResponse);
        }

        const entriesPerPage = configResponse.log.entriesPerPage;

        // Fetch container logs and maxPage
        const logsResponse = await fetchContainerLogs(id, page, entriesPerPage);
        setLogs(logsResponse.logs);
        setMaxPage(logsResponse.maxPage);
        setBusy(false);
    }

    // Get logs in response to a page change.
    useEffect(() => {
        getLogs(name);
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