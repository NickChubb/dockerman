import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import TextParameter from './TextParameter.js';
import BoolParameter from './BoolParameter.js';

const ConfigGroup = ({ param, value }) => {

    const getValueType = ( param, value ) => {

        switch ( typeof value ) {
            case "string" :
                return (<TextParameter param={param} value={value} />);
            case "boolean": 
                return (<BoolParameter param={param} value={value} />);
            default:
                break;
        }
    }

    return (
        <Form className="form" inline>
            { this.getValueType(param, value) }
        </Form>
    )
}

export default ConfigGroup;