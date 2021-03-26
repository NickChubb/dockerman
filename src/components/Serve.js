//import Button from './Button';
import { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Serve = ({ ports, id, name }) => {

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        


    }, []);


    return (
        <>
            <Form className="form" inline>  
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2" 
                    label="Serve" 
                    id={"on-switch-" + id}
                    onChange={e => setEnabled(e.target.checked)}
                />

                {enabled ? 
                    <Form.Control as="select" >
                        <option>{ports[0].PublicPort}</option>
                    </Form.Control> 
                    : 
                    <Form.Control as="select" disabled >
                        <option>{ports[0].PublicPort}</option>
                    </Form.Control>  
                } 
                on
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>nickchubb.ca/</InputGroup.Text>
                    </InputGroup.Prepend>
                    {enabled ? <FormControl id="slug" placeholder="" /> : <FormControl id="slug" placeholder={name} disabled />}
                    
                </InputGroup>

                {/* <Button variant="primary" type="submit" text="Serve" /> */}
            </Form>
        </>
    )
}

export default Serve;
