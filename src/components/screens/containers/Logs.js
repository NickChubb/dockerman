import '../log/log.css';

const Logs = ({ logs }) => {

    return (
        <div style={{
            textAlign: 'left',
            wordWrap: 'break-word'
        }}>
            {
                logs && logs.length > 0 ?

                    logs.map(( log, key ) => {
                        return (
                            <>
                                <span key={key}>{log}</span>
                                <br />
                            </>
                        )
                    })
                    :
                    <div className='no-data-message' >No logs to display.</div>
            }
        </div>
        
    )
}

export default Logs;
