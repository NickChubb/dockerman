import './log.css';
import LogEntry from './LogEntry.js';
import Loading from '../../Loading';
import { Link } from 'react-router-dom';

const Log = ({log, isBusy}) => {

    return (

        <div className='log-container'>
            { isBusy ? (
                    <Loading />
                ) : (
                    <table className='log-area'>
                        { log && log.length > 0 ?
                            
                                log.map((entry) => (
                                        <LogEntry entry={entry} />
                                ))
                                :
                                <div className='no-data-message' >No logs to display.</div>
                        }
                    </table>
            )}
            <div className='log-controls'>
                <Link>back</Link> 
                <Link>next</Link>
            </div>      
        </div>
    )
}

export default Log