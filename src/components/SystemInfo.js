import { fetchSystemInfo, fetchDockerVersion } from './api/system.js';
import { formatBytes } from './api/helpers.js';
import { useState, useEffect } from 'react';

const SystemInfo = () => {

    const [info, setInfo] = useState([]);
    const [version, setVersion] = useState([]);

    useEffect(() => {
        const getSystemInfo = async () => {
            const systemInfo = await fetchSystemInfo();
            console.log(systemInfo);
            setInfo(systemInfo);
        }

        const getDockerVersion = async () => {
            const dockerVersion = await fetchDockerVersion();
            setVersion(dockerVersion);
        }

        getSystemInfo();
        getDockerVersion();
    }, []); 

    return (
        <span>
            <strong>Size:</strong> {formatBytes(info.LayersSize)} | <strong>Docker Version:</strong> {version.Version}
        </span>
    )
}

export default SystemInfo
