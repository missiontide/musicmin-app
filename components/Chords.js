"use client";

import styles from '../styles/Chords.module.css';

import React, { useState, useEffect } from 'react';
import ApiWrapper from "../utils/ApiWrapper";
import appStyles from "../styles/SongSearchBar.module.css";

export default function Chords(props) {
    const [songData, setSongData] = useState({});

    // Initialize: get song data from API
    useEffect(() => {
        // need to define an async function
        const getSongData = async () => {
            const data = await ApiWrapper.getSong(props.slug);
            setSongData(data);
        };

        getSongData().then()
    }, [])

    const loadingJsx = (
        <div className={appStyles.spinnerContainer}>
            <div className="spinner-border text-dark"/>
            <p>Loading Chords...</p>
        </div>
    )

    return (
        <div>
            <div className={styles.chordsContainer}>
                <div className={styles.chords}>
                    {Object.keys(songData).length === 0 ? loadingJsx :
                        (<>
                        <h4>{songData.title} - {songData.artist}</h4>
                        <br/>
                        <div dangerouslySetInnerHTML={{ __html: songData.chords }} />
                        </>)
                    }
                </div>
            </div>
        </div>
    )
}
