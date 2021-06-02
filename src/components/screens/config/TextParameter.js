import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const TextParameter = ({ param, value }) => {

    return (
        <InputGroup>
        {param}
        <FormControl 
                id={param}
                value={value}
                onChange={e => {
                    alert(e.target.value);
                }} 
            /> 
    </InputGroup>
    )
}

export default TextParameter;