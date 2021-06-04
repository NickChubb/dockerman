import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const TextParameter = ({ setConfig, param, value }) => {

    return (
        <InputGroup className="form-parameter">
            <span> {param} </span>
            <FormControl
	    	    className="form-entry"
                    id={param}
                    name={param}
                    defaultValue={value}
                    onChange={e => {
                        
                    }} 
                /> 
        </InputGroup>
    )
}

export default TextParameter;
