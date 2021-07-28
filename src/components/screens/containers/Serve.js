//import Button from './Button';
import { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { updateService, getService } from '../../api/db.js';
import { fetchConfig } from '../../api/system.js';
import Button from '../../Button.js';
import { AiOutlineLink } from 'react-icons/ai';

const Serve = ({ ports, id, name }) => {

    let defaultPort = ports[0] ? ports[0].PublicPort : "0000";
    
    const [domainName, setDomainName] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [slug, setSlug] = useState('');
    const [port, setPort] = useState(defaultPort);

    useEffect(() => {
        getService(name).then(service => {
            setSlug(service.slug);
            setEnabled(service.served);
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
        return `https://${domainName}/${slug}/`;
    }

    return (
        <Form className="form" onSubmit={handleSubmit} inline>
            {enabled ?
                <Form.Check 
                    type="switch" 
                    className="mb-2 mr-sm-2" 
                    label="Serve"
                    id={"on-switch-" + name}
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
                    id={"on-switch-" + name}
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
                    <InputGroup.Text>{domainName}/</InputGroup.Text>
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
            
            <a href={getLink()} target="_blank"><AiOutlineLink /></a>
            
        </Form>
    )
}

export default Serve;
