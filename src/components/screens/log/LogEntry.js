import './log.css';
const moment = require('moment');

const LogEntry = ({entry}) => {

    return (
        <div className="log-entry">
            <p><b>🕑{moment(entry.time).format("dddd, MMMM Do YYYY, h:mm:ss a")}... 👉 </b> {entry.message}</p>
        </div>
    )
}

export default LogEntry;