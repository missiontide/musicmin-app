import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import SongSearchBar from "./SongSearchBar";
import SelectedSongs from "./SelectedSongs";
import makeSlides from "../utils/makeSlides";
import {ProgressBar, Toast, ToastContainer, Image} from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";
import { usePlausible } from 'next-plausible'
import RequestSongModal from "./RequestSongModal";
import SlideStyles from "../utils/SlidesStyles";
import ApiWrapper from "../utils/ApiWrapper";

export default function App() {
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [showCanvas, setShowCanvas] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [slidesCreated, setSlidesCreated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [allCaps, setAllCaps] = useState(false);
    const plausible = usePlausible()
    const MAX_SONGS = 10;

    // Initialize: get song data from API
    useEffect(() => {
        // need to define an async function
        const getData = async () => {
            const data = await ApiWrapper.getAllSongs();
            setSongs(data);
        };

        getData().then()
    }, [])

    // handles add song click
    function handleAddSong(song) {
        // too many songs added -- show error Toast
        if (selectedSongs.length >= MAX_SONGS) {
            setShowError(true);
        } else {
            // add song to selected songs and open selected songs canvas
            setSelectedSongs(selectedSongs.concat(song));
            setShowCanvas(true);
            setSlidesCreated(false); // when a change occurs, re-enable the create slides button
        }
    }

    // handles selected song remove click
    // removes song at index of selectedSongs
    function handleRemoveSong(idx) {
        const newSelectedSongs = selectedSongs.filter((_, i) => {return i !== idx});

        setSelectedSongs(newSelectedSongs);
        setShowCanvas(newSelectedSongs.length !== 0);
        setSlidesCreated(false); // when a change occurs, re-enable the create slides button
    }

    // Make slides
    function handleSubmit() {
        plausible('Slideshow Made'); // analytics
        setLoading(true);
        makeSlides(selectedSongs, getSlideStyles()).finally(() => {
            setLoading(false);
            setSlidesCreated(true);
        });
    }

    function getSlideStyles() {
        const slideStyles = new SlideStyles();
        slideStyles.setDarkMode(darkMode);
        slideStyles.setAllCaps(allCaps);
        return slideStyles;
    }

    // handle drag-and-drop ordering
    function onDragEnd(result) {
        const {destination, source} = result;
        if (!destination) return; // wasn't dropped into a droppable
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newSelectedSongs = Array.from(selectedSongs);
        const songToMove = selectedSongs[source.index];
        newSelectedSongs.splice(source.index, 1); // remove
        newSelectedSongs.splice(destination.index, 0, songToMove) // insert

        setSelectedSongs(newSelectedSongs);
    }

    return (
        <div className="App">
            <p className="signature">
                made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
            </p>
            {(loading || sending) && (
                <div id="loadingOverlay">
                    <div>
                        <h3 className="loadingText">
                            {loading ? 'Creating worship slides...' : 'Sending song request...'}
                        </h3>
                        <ProgressBar animated now={65}/>
                    </div>
                </div>)
            }
            <ToastContainer position="top-end">
                <Toast
                    onClose={() => setShowError(false)}
                    show={showError}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <img
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Error</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Maximum songs reached.</Toast.Body>
                </Toast>
            </ToastContainer>

            <RequestSongModal
                setSending={setSending}
            />
            <header className="App-header">
                <Image src="/logo.png" className="App-logo" alt="logo" fluid />
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <SelectedSongs
                    selectedSongs={selectedSongs}
                    onClick={(idx) => handleRemoveSong(idx)}
                    onShow={() => setShowCanvas(true)}
                    onHide={() => setShowCanvas(false)}
                    show={showCanvas}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    allCaps={allCaps}
                    setAllCaps={setAllCaps}
                    makeSlides={() => handleSubmit()}
                    slidesCreated={slidesCreated}
                />
            </DragDropContext>
            <SongSearchBar
                songs={songs}
                onClick={(song) => handleAddSong(song)}
            />
        </div>
    );
}