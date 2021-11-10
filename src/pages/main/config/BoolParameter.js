import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const BoolParameter = ({ param, value }) => {

    const [ enabled, setEnabled ] = useState(value);

    return (
        <InputGroup>
            <span className="form-title"> {param} </span>
            {enabled ?
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2 form-entry-switch"  
                    id={param}
                    name={param}
                    onChange={e => {
                        setEnabled(e.target.checked);
                    }}
                    value={enabled}
                    checked
                />
                :
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2 form-entry-switch"
                    id={param}
                    name={param}
                    onChange={e => {
                        setEnabled(e.target.checked);
                    }}
                    value={enabled}
                />
            } 
        </InputGroup>
    )
}

export default BoolParameter;