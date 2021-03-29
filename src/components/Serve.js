//import Button from './Button';
import { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { updateService, getService } from './api/db.js';

const Serve = ({ ports, id, name }) => {

    let defaultPort = ports[0].PublicPort;

    const [enabled, setEnabled] = useState(false);
    const [slug, setSlug] = useState('');
    const [port, setPort] = useState(defaultPort);

    getService(id).then(service => {
        setSlug(service.slug);
        setEnabled(service.served);
    });

    useEffect(() => {
        

    }, []);

    const handleSubmit = (evt) => {
        updateService(id, enabled, slug, port);
    }

    return (
        <Form className="form" inline>
            {enabled ?
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2" 
                    label="Serve"
                    id={"on-switch-" + id}
                    onChange={e => {
                        setEnabled(e.target.checked);
                        handleSubmit(e);
                    }}
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
                        handleSubmit(e);
                    }}
                />
            } 

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
                {enabled 
                ? 
                <FormControl 
                    id="slug" 
                    placeholder="" 
                    onChange={e => {
                        setSlug(e.target.value);
                        handleSubmit(e);
                    }} 
                /> 
                : 
                <FormControl value={slug} id="slug" placeholder={name} disabled />}
                
            </InputGroup>
        </Form>
    )
}

export default Serve;
