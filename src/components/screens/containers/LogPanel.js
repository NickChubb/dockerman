import { useState, useEffect } from 'react';
import Logs from './Logs';
import Loading from '../../Loading';
import { fetchContainerLogs } from '../../api/container';
import { fetchConfig } from '../../api/system';

const LogPanel = ({ containerInfo }) => {

    const [ isBusy, setBusy ] = useState(true);
    const [ logs, setLogs ] = useState(null);

    const name = containerInfo.Name.substring(1);

    // Fetch logs
    const getLogs = async (id) => {
        setBusy(true);
        const config = await fetchConfig();
        const logsResponse = await fetchContainerLogs(id, 0, config.log.entriesPerPage);
        setLogs(logsResponse);
        setBusy(false);
    }

    useEffect(() => {
        getLogs(name);
    }, []);

    return (
        <>
            <h2>Logs</h2>

            {
                isBusy ? (
                    <Loading />
                ) : (
                    <Logs logs={logs} />
                )
            }
        </>
    )
}

export default LogPanel;