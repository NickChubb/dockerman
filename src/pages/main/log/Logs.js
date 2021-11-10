import LogEntry from './LogEntry';
import './log.css';

const Logs = ({ logs }) => {

    return (
        // <div style={{
        //     textAlign: 'left',
        //     wordWrap: 'break-word'
        // }}>
        //     {
        //         logs && logs.length > 0 ?

        //             logs.map(( log, key ) => {
        //                 return (
        //                     <>
        //                         <span key={key}>{log}</span>
        //                         <br />
        //                     </>
        //                 )
        //             })
        //             :
        //             <div className='no-data-message' >No logs to display.</div>
        //     }
        // </div>

        <table className='log-area'>
            { logs && logs.length > 0 ?
                
                    logs.map((entry) => (
                            <LogEntry entry={entry} />
                    ))
                    :
                    <div className='no-data-message' >No logs to display.</div>
            }
        </table>
        
    )
}

export default Logs;
