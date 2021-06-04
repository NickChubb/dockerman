import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const TextParameter = ({ setConfig, param, value }) => {

    return (
        <InputGroup>
            {param}
            <FormControl 
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