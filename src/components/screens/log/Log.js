import LogEntry from './LogEntry.js';
import Loading from '../../Loading';

const Log = ({log, isBusy}) => {

    return (

        <div className='container'>
            { isBusy ? (
                    <Loading />
                ) : (
                    <>
                        { log && log.length > 0 ?
                            
                                log.map((entry) => (
                                        <LogEntry entry={entry} />
                                ))
                                :
                                <div>No logs to display.</div>
                        }
                    </>
            )}
            <div>
                <a>back</a> 
                
                <a>next</a>
            </div>      
        </div>
    )
}

export default Log