import './log.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { DateTime } from 'luxon'

const LogEntry = ({entry}) => {

    return (
        // <Row className="log-entry">
        //     <Col xs={6} md={4} className="log-time">
        //         <b> {'>  ' +  DateTime.fromISO(entry.time).toLocaleString(DateTime.DATETIME_FULL)}...</b>
        //     </Col>
        //     <Col xs={12} md={8} className="log-message">
        //         {'~ ' + entry.message}
        //     </Col>
        // </Row>
        <tr className="log-entry">
            <td className="log-time">
                <b> {'>  ' +  DateTime.fromISO(entry.time).toLocaleString(DateTime.DATETIME_FULL)} </b>
            </td>
            <td className="log-message">
                {'~ ' + entry.message}
            </td>
        </tr>
    )
}

export default LogEntry;