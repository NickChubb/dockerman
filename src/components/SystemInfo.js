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
            <strong>Docker Size:</strong> {formatBytes(dockerInfo.LayersSize)} | <strong>Docker Version:</strong> {version.Version} | 
        </span>
    )
}

export default SystemInfo
