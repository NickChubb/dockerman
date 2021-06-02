import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const BoolParameter = ({ param, value }) => {

    return (
        <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2" 
                    label="Serve"
                    id={param}
                    onChange={e => {
                        // setEnabled(e.target.checked);
                    }}
                    value={value}
                />
    )
}

export default BoolParameter;