import { fetchSystemInfo, fetchDockerVersion, fetchInfo } from './api/system.js';
import { formatBytes } from './api/helpers.js';
import { useState, useEffect } from 'react';

const SystemInfo = () => {

    const [info, setInfo] = useState([]);
    const [dockerInfo, setDockerInfo] = useState([]);
    const [version, setVersion] = useState([]);

    useEffect(() => {

        const getInfo = async () => {
            const systemInfo = await fetchInfo();
            console.log(systemInfo);
            setInfo(systemInfo);
        }

        const getDockerInfo = async () => {
            const dockerInfo = await fetchSystemInfo();
            console.log(dockerInfo);
            setDockerInfo(dockerInfo);
        }

        const getDockerVersion = async () => {
            const dockerVersion = await fetchDockerVersion();
            setVersion(dockerVersion);
        }

        getInfo();
        getDockerInfo();
        getDockerVersion();
    }, []); 

    return (
        <span>
            <u>Docker Size:</u> {formatBytes(dockerInfo.LayersSize)} | <u>Docker Version:</u> {version.Version} |<span> </span>
            <u>Memory:</u> {formatBytes(info.freemem)} / {formatBytes(info.totalmem)} |<span> </span>
            <u>Disk Space:</u> {formatBytes(info.usedspace)} / {formatBytes(info.totalspace)} ({info.capacityspace})
        </span>
    )
}

export default SystemInfo