"use client";

import styles from '../styles/App.module.css';

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
import Link from "next/link";
import Chords from "./Chords";
import Loading from "../app/songs/[slug]/loading";
import makeChords from "../utils/makeChords";

export default function App(props) {
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [showCanvas, setShowCanvas] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [loadingChordsPage, setLoadingChordsPage] = useState(false);
    const [slidesCreated, setSlidesCreated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [allCaps, setAllCaps] = useState(false);
    const [exportType, setExportType] = useState('slideshow');
    const plausible = usePlausible()
    const MAX_SONGS = 10;

    // Initialize: get song data from API, load selectedSongs from localStorage
    useEffect(() => {
        setSelectedSongs(JSON.parse(localStorage.getItem('selectedSongs')) || []);

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

    useEffect(() => {
        localStorage.setItem('selectedSongs', JSON.stringify(selectedSongs));
    }, [selectedSongs])

    // handles selected song remove click
    // removes song at index of selectedSongs
    function handleRemoveSong(idx) {
        const newSelectedSongs = selectedSongs.filter((_, i) => {return i !== idx});

        setSelectedSongs(newSelectedSongs);
        setShowCanvas(newSelectedSongs.length !== 0);
        setSlidesCreated(false); // when a change occurs, re-enable the create slides button
    }

    function removeAllSongs() {
        setSelectedSongs([]);
        setShowCanvas(false);
        setSlidesCreated(false); // when a change occurs, re-enable the create slides button
    }

    // Make slides
    function handleSubmit() {
        if (exportType === "slideshow") {
            plausible('Slideshow Made'); // analytics
            setLoading(true);
            makeSlides(selectedSongs, getSlideStyles()).finally(() => {
                setLoading(false);
                setSlidesCreated(true);
            });
        } else if (exportType === "chordsheets") {
            plausible('Chord Sheet Made'); // analytics
            setLoading(true);
            makeChords(selectedSongs).finally(() => {
                setLoading(false);
                setSlidesCreated(true);
            });
        }
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


     /* chords page has a fetch in head.js -- this is blocking.
      * to give user visual feedback as soon as they click, we set the loading page here
      * once head.js returns, then the proper loading.js -> page.js process happens */
    if (loadingChordsPage) {
        return <Loading />
    }

    return (
        <div className={styles.App}>
            <p className={styles.signature}>
                made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
                &nbsp;& <a href="https://gabbley.github.io/" target="_blank" rel="noreferrer">@gabbley</a>
            </p>
            {(loading || sending) && (
                <div className={styles.loadingOverlay}>
                    <div>
                        <h3 className={styles.loadingText}>
                            {loading ?
                                ('Creating worship'
                                    + (exportType === 'slideshow'?
                                        ' slides...' :
                                        ' chords...')
                                )
                                : 'Sending song request...'
                            }
                        </h3>
                        <ProgressBar animated now={65} className={styles.progress} />
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
            {/* className styling logic moves height of logo and search higher for Chords Pages */}
            <header className={props.chordsSlug ? styles.AppHeaderAlt : styles.AppHeader}>
                <Link href="/"><Image src="/logo.png" alt="logo" fluid /></Link>
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <SelectedSongs
                    selectedSongs={selectedSongs}
                    onClick={(idx) => handleRemoveSong(idx)}
                    removeAllSongs={() => removeAllSongs()}
                    onShow={() => setShowCanvas(true)}
                    onHide={() => setShowCanvas(false)}
                    show={showCanvas}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    allCaps={allCaps}
                    setAllCaps={setAllCaps}
                    onSubmit={() => handleSubmit()}
                    slidesCreated={slidesCreated}
                    resetSubmit={() => setSlidesCreated(false)}
                    exportType={exportType}
                    setExportType={setExportType}
                />
            </DragDropContext>
            <SongSearchBar
                songs={songs}
                onClick={(song) => handleAddSong(song)}
                setLoadingChordsPage={setLoadingChordsPage}
                chordsPage={props.chordsSlug}
            />
            { props.chordsSlug && (
                <Chords
                    onClick={(song) => handleAddSong(song)}
                    slug={props.chordsSlug}
                />
            )}
        </div>
    );
}