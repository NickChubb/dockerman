//import Button from './Button';
import { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { updateService, getService } from './api/db.js';
import Button from './Button.js';

const Serve = ({ ports, id, name }) => {

    let defaultPort = "0000";

    const [enabled, setEnabled] = useState(false);
    const [slug, setSlug] = useState('');
    const [port, setPort] = useState(defaultPort);

    useEffect(() => {
        getService(id).then(service => {
            setSlug(service.slug);
            setEnabled(service.served);
        });

    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateService(id, enabled, slug, port);
    }

    return (
        <Form className="form" onSubmit={handleSubmit} inline>
            {enabled ?
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2" 
                    label="Serve"
                    id={"on-switch-" + id}
                    onChange={e => {
                        setEnabled(e.target.checked);
                    }}
                    value={enabled}
                    checked
                />
                :
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2" 
                    label="Serve"
                    id={"on-switch-" + id}
                    onChange={e => {
                        setEnabled(e.target.checked);
                    }}
                />
            } 

            {enabled ? 
                <Form.Control as="select" >
                    {
                        ports.map((port) => (
                            <option>{port.PublicPort}</option>
                        ))
                    }
                </Form.Control> 
                : 
                <Form.Control as="select" disabled >
                    <option>{defaultPort}</option>
                </Form.Control>  
            } 
            on
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>nickchubb.ca/</InputGroup.Text>
                </InputGroup.Prepend>
                {enabled 
                    ? 
                    <FormControl 
                        id="slug" 
                        onChange={e => {
                            setSlug(e.target.value);
                        }} 
                    /> 
                    : 
                    <FormControl value={slug} id="slug" placeholder={name} disabled />
                }
                
            </InputGroup>
            
            <Button variant="primary" color="dodgerblue" type="submit" text="update" />    
            
        </Form>
    )
}

export default Serve;
