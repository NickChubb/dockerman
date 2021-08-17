//import Button from './Button';
import { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { updateService, getService } from '../../api/db.js';
import { fetchConfig } from '../../api/system.js';
import Button from '../../Button.js';
import { AiOutlineLink } from 'react-icons/ai';

const ServeForm = ({ ports, id, name, state }) => {

    const [domainName, setDomainName] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [slug, setSlug] = useState('');
    const [port, setPort] = useState('0000');

    useEffect(() => {
        
        getService(name).then(service => {
            setSlug(service.slug);
            setPort(service.port);

            if (state == 'running') {
                setEnabled(service.served);
            }
        });

        fetchConfig().then(config => {
            setDomainName(config.domain.domainName);
        });

    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updateService(name, enabled, slug, port);
    } 

    const getLink = () => {
        if ( !enabled ) return;

        return `https://${domainName}/${slug}/`;
    } 

    return (
        <Form className="form" onSubmit={handleSubmit} inline>

            <Form.Check 
                type="switch" 
                className="mb-2 mr-sm-2" 
                label="Serve"
                id={"on-switch-" + name}
                onChange={e => {
                    setEnabled(e.target.checked);
                }}
                value={enabled}
                checked={enabled}
                disabled={state !== 'running'}
            />

            <Form.Control 
                as="select" 
                onChange={e => {
                    setPort(e.target.value);
                }} 
                disabled={!enabled} 
            >
                {
                    ports.map((port) => (
                        <option>{port.PublicPort}</option>
                    ))
                }
            </Form.Control> 

            <span>on</span>

            <InputGroup>
                <InputGroup.Prepend>
                     <InputGroup.Text>{domainName}/</InputGroup.Text>
                </InputGroup.Prepend>
                    <FormControl 
                        id="slug" 
                        onChange={e => {
                            setSlug(e.target.value);
                        }} 
                        value={slug}
                        disabled={!enabled}
                    /> 
                
            </InputGroup>
                
            <Button 
                variant="primary" 
                color="dodgerblue" 
                name="submit" 
                type="submit" 
                text="update" /> 
            
            <a href={getLink()} target="_blank"><AiOutlineLink /></a>

        </Form>
    )
}

export default ServeForm;
