import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import TextParameter from './TextParameter.js';
import BoolParameter from './BoolParameter.js';

const ConfigGroup = ({ setConfig, param, value }) => {

    // Depending on the type of value for the config parameter,
    // Gets a different component which handles the different cases.
    const getValueType = ( param, value ) => {

        switch ( typeof value ) {
            case "number":
            case "string":
                return (<TextParameter setConfig={setConfig} param={param} value={value} />);
            case "boolean": 
                return (<BoolParameter setConfig={setConfig} param={param} value={value} />);
            default:
                return (<p>ERROR: Improperly formatted config option.</p>)
        }
    }

    return (
        <>
            { getValueType(param, value) }
        </>
    )
}

export default ConfigGroup;