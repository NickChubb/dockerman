import LogEntry from './LogEntry.js';

const Log = ({log}) => {

    return (
        <>
            {log.map((entry) => (
                    <LogEntry entry={entry} />
            ))}
        </>
    )
}

export default Log