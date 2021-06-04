import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const BoolParameter = ({ param, value }) => {

    return (
        <InputGroup>
            {param}
            <Form.Check 
                        type="switch" 
                        className="mb-2 mr-sm-2" 
                        id={param}
                        name={param}
                        onChange={e => {
                            
                        }}
                        defaultValue={value}
                    />
        </InputGroup>
    )
}

export default BoolParameter;