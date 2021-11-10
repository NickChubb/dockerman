import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const TextParameter = ({ setConfig, param, value }) => {

    return (
        <div className="form-parameter">
            <span className="form-title"> {param} </span>
            <InputGroup className="form-entry">
                <FormControl
                        className="form-entry-text"
                        id={param}
                        name={param}
                        defaultValue={value}
                        onChange={e => {
                            
                        }} 
                    /> 
            </InputGroup>
        </div>
    )
}

export default TextParameter;
