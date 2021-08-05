import './log.css';
import LogEntry from './LogEntry.js';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';

const Log = ({log, isBusy}) => {

    return (

        <div className='container'>
            { isBusy ? (
                    <Loading />
                ) : (
                    <div className='log-area'>
                        { log && log.length > 0 ?
                            
                                log.map((entry) => (
                                        <LogEntry entry={entry} />
                                ))
                                :
                                <div className='no-data-message' >No logs to display.</div>
                        }
                    </div>
            )}
            <div className='log-controls'>
                <Link>back</Link> 
                <Link>next</Link>
            </div>      
        </div>
    )
}

export default Log