import Button from './Button';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const Serve = () => {
    return (
        <>
            <Form>
                <Form.Group controlId="port">
                    <Form.Label>Serve Port:</Form.Label>
                    <Form.Control type="select" placeholder="">
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="slug">
                    <Form.Label>at</Form.Label>
                    <Form.Control placeholder="/home" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form> 
        </>
    )
}

export default Serve;
