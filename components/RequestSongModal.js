import React, { useState } from "react";
import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ApiWrapper from "../utils/ApiWrapper";

export default function RequestSongModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        songTitle: "",
        songArtist: "",
        email: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            props.setSending(true);
            sendEmail().then(r => {
                handleClose();
                setFormData({
                    songTitle: "",
                    songArtist: "",
                    email: "",
                })
                setValidated(false);
                props.setSending(false);
                setShowSuccess(true);
            });
        } else {
            setValidated(true);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    async function sendEmail() {
        const response = ApiWrapper.sendSongRequest(formData.songTitle, formData.songArtist, formData.email);
    }

    return (
        <>
            <p className="requestSong">
                <a onClick={handleShow}>
                    Request a Song
                </a>
            </p>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request a Song</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Song Title</Form.Label>
                            <Form.Control
                                required
                                name="songTitle"
                                type="text"
                                placeholder="Title"
                                value={formData.songTitle}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formArtist">
                            <Form.Label>Song Artist</Form.Label>
                            <Form.Control
                                required
                                name="songArtist"
                                type="text"
                                placeholder="Artist"
                                value={formData.songArtist}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Your Email address</Form.Label>
                            <Form.Control
                                required
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <ToastContainer position="top-end">
                <Toast
                    onClose={() => setShowSuccess(false)}
                    show={showSuccess}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <img
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Request Submitted</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Thank you for helping to improve musicmin.app!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}