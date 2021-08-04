import './log.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const moment = require('moment');

const LogEntry = ({entry}) => {

    return (
        <Row className="log-entry">
            <Col xs={7} md={5} className="log-time">
                <b> {'>  ' + moment(entry.time).format("dddd, MMMM Do YYYY, h:mm:ss a")}...</b>
            </Col>
            <Col xs={11} md={7} className="log-message">
                {'~ ' + entry.message}
            </Col>
        </Row>
    )
}

export default LogEntry;