import LogEntry from './LogEntry.js';

const Log = ({log}) => {

    return (
        <div className='container'>
            {log.map((entry) => (
                    <LogEntry entry={entry} />
            ))}
            <div>
                <a>back</a> 
                
                <a>next</a>
            </div>
        </div>
    )
}

export default Log