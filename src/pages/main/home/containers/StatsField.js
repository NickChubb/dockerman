import { formatBytes } from '../../../../api/helpers.js'

const StatsField = ({ stats }) => {

    // Mem
    const memLimit = formatBytes(stats.memory_stats.limit);
    const memUsage = formatBytes(stats.memory_stats.usage)
    const memPercent = ((stats.memory_stats.usage / stats.memory_stats.limit) * 100).toFixed(2);
    const memMaxUsage = formatBytes(stats.memory_stats.max_usage);

    // CPU
    const cpuTotal = stats.cpu_stats.cpu_usage.total_usage;
    const cpuUsage = stats.cpu_stats.system_cpu_usage;
    const onlineCpus = stats.cpu_stats.online_cpus;
    const cpuPercent = ((cpuTotal / cpuUsage) * onlineCpus * 100).toFixed(2);


    return (
        <>
            <h4>Stats</h4>

            <table>
                <tr>
                    <th>Memory Usage:</th>
                    <td>{memUsage} / {memLimit} ({memPercent}%)</td>
                </tr>
                <tr>
                    <th>Max Memory Usage:</th>
                    <td>{memMaxUsage}</td>
                </tr>
                <tr>
                    <th>CPU Usage:</th>
                    <td>{cpuPercent}% </td>
                </tr>
            </table>
        </>
    )

}

export default StatsField;