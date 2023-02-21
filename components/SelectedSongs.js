import styles from '../styles/SelectedSongs.module.css';

import { Offcanvas, Button, Card, ListGroup, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function SelectedSongs(props) {
    const noSongsSelected = props.selectedSongs.length === 0
    let exportTypeWord = props.exportType === "slideshow" ? "Slides" : "Chords";

    return (
        <>
            {/* top-left button: open offCanvas */}
            <Button className={styles.makeSlidesButton} variant="dark" onClick={props.onShow}>
                Make {exportTypeWord}
            </Button>

            <Offcanvas show={props.show} onHide={props.onHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Make:
                    </Offcanvas.Title>
                    <div className={styles.exportRadio}>
                        <Form.Check
                            inline
                            label="Slides"
                            name="group1"
                            type="radio"
                            checked={props.exportType === "slideshow"}
                            onChange={() => {props.setExportType("slideshow"); props.resetSubmit();}}
                        />
                        <Form.Check
                            inline
                            label="Chords"
                            name="group1"
                            type="radio"
                            checked={props.exportType === "chordsheets"}
                            onChange={() => {props.setExportType("chordsheets"); props.resetSubmit();}}
                        />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card style={{ width: '22.5rem' }}>
                        <Card.Header>{noSongsSelected ? "Select a song" : "Selected Songs" }</Card.Header>
                        {/* drag and drop context */}
                        <Droppable droppableId={"selectedSongDroppable"}>
                            {provided =>
                                <ListGroup
                                    variant="flush"
                                    ref={provided.innerRef}
                                >
                                    {/* selected songs list */}
                                    {props.selectedSongs.map((song, index) => {
                                        const idKey=index + "-" + song['id'];
                                        return (
                                            <Draggable
                                                draggableId={idKey}
                                                index={index}
                                                key={idKey}
                                            >
                                                {provided => (
                                                    <ListGroup.Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        {song.title} - {song.artist}
                                                        <Button
                                                            variant="outline-danger" size="sm" className="float-end"
                                                            onClick={() => props.onClick(index)}
                                                        >
                                                            x
                                                        </Button>
                                                    </ListGroup.Item>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ListGroup>
                            }
                        </Droppable>
                    </Card>
                    {/* Clear all songs button */}
                    {props.selectedSongs.length > 0 &&
                        <Button variant="outline-danger"
                                size="sm"
                                className={styles.clearButton}
                                onClick={() => props.removeAllSongs()}
                        >
                            Clear all
                        </Button>
                    }
                    {/* Add more songs button (closes Offcanvas) */}
                    {props.selectedSongs.length < 10 &&
                        <Button variant="dark"
                                size="sm"
                                className={styles.addSongsButton}
                                onClick={props.onHide}
                        >
                            {noSongsSelected ? "Add a song >" : "Add more songs >"}
                        </Button>
                    }
                    {/* Slide styling */}
                    {props.exportType === "slideshow" && (
                        <Card id="slideStyleCard"
                              style={{ width: '22.5rem', bottom: "6.5rem", marginLeft: "16px"}}
                              className="fixed-bottom"
                        >
                            <Card.Header>Slide Styles</Card.Header>
                            <Card.Body>
                                <Row>
                                    {/* Dark Mode */}
                                    <Col>
                                        <Form.Check
                                            type="switch"
                                            checked={props.darkMode}
                                            onChange={() => {props.setDarkMode(!props.darkMode); props.resetSubmit();}}
                                            className="float-left"
                                            label="Dark Mode"
                                        />
                                    </Col>
                                    {/* All Caps */}
                                    <Col>
                                        <Form.Check
                                            type="switch"
                                            checked={props.allCaps}
                                            onChange={() => {props.setAllCaps(!props.allCaps); props.resetSubmit();}}
                                            className="float-left"
                                            label="All Caps"
                                        />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                    {/* make slides button */}
                    <Button variant="primary" style={{height: '6rem'}}
                            className="float-end fixed-bottom position-absolute"
                            onClick={() => props.onSubmit()}
                            disabled={noSongsSelected || props.slidesCreated === true}
                    >
                        {props.slidesCreated === false ? "Make "+exportTypeWord : exportTypeWord+" Downloaded!"}
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}