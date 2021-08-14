import { useState, useEffect } from 'react';
import Logs from './Logs';
import Loading from '../../Loading';
import Button from '../../Button';
import { fetchContainerLogs } from '../../api/container';
import { fetchConfig } from '../../api/system';
import '../log/log.css';

const LogPanel = ({ containerInfo }) => {

    const [ isBusy, setBusy ] = useState(true);
    const [ entriesPerPage, setEntriesPerPage ] = useState(null);
    const [ config, setConfig ] = useState(null);
    const [ logs, setLogs ] = useState(null);
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
        const logsResponse = await fetchContainerLogs(id, page, entriesPerPage);
        // setEntriesPerPage(entries);
        setLogs(logsResponse);
        setBusy(false);
    }

    useEffect(() => {
        getLogs(name);
    }, []);

    const handleNextClick = () => {
        setPage(page + 1);
        getLogs(name);
    }

    const handleBackClick = () => {
        setPage(page - 1);
        getLogs(name);
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