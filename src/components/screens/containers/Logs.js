
const Logs = ({ logs }) => {

    return (
        <div style={{
            textAlign: 'left'
        }}>  
            {
                logs && logs.length > 0 ?

                    logs.map(( log, key ) => {
                        return <p key={key}>{log}</p>
                    })
                    :
                    <div>No logs to display.</div>
            }
        </div>
    )
}

export default Logs;
