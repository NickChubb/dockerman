import Button from '../../Button';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { addRepo } from '../../api/repo.js';
import Popup from 'react-popup';
import { errorPopup } from '../../popup.js';

const DisplayNew = () => {

    let history = useHistory();

    const [url, setUrl] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const res = await addRepo(name, url);
        console.log(res);
        if (res.status == 200) {
            history.push('/git');
        } else {
            const json = await res.json();
            Popup.queue(errorPopup(json.error.message, json.error.err));
        }
    } 

    return (
        <Form onSubmit={handleSubmit}>
            
            <Button variant="primary" color="dodgerblue" name="add" type="submit" text="add" />
            <Link to="/git">
                <Button variant="secondary" color="lightgrey" name="cancel" type="submit" text="cancel" />
            </Link>

            <Form.Group controlId="formUrl">
                <Form.Label>Github Clone URL</Form.Label>
                <Form.Control type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter Github SSH/URL" />
                <Form.Text className="text-muted">
                    Click the code drop-down on the repo you want to clone and paste the SSH link here.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formName">
                <Form.Label>Container Name</Form.Label>
                <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Container Name" />
                <Form.Text className="text-muted">
                    Must be unique, cannot match other container which already exists.
                </Form.Text>
            </Form.Group>
        </Form>
    )
}

export default DisplayNew;