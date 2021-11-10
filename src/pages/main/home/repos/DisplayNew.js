import Button from '../../Button';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const DisplayNew = () => {

    let history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        history.push('/');
    } 

    return (
        <Form onSubmit={handleSubmit} className="form">

            <h2>Add Container</h2>
            <hr />

            <Form.Group controlId="formTitle">
                <Form.Label>Event Title</Form.Label>
                <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Event Title..." />
                <Form.Text className="text-muted">
                Include your student union's acronym or department name for your respective logo.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Come out to our awesome event where we will.... (Don't forget to include lots of emojis 😎)" />
            </Form.Group>

            <Form.Group controlId="formLocation">
                <Form.Label>Event Location</Form.Label>
                <Form.Control type="file" value={location} onChange={e => setLocation(e.target.value)} placeholder="Event Location (eg. AQ 9001 or #meeting-room-1)" />
            </Form.Group>
            
            <Form.Group controlId="formDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="" />
            </Form.Group>

            <Form.Group controlId="formStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="time" value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="" />
            </Form.Group>

            <Form.Group controlId="formEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="time" value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="" />
            </Form.Group>

            <Button variant="primary" color="dodgerblue" type="submit" text="submit" />
        </Form>
    )
}

export default DisplayNew;
