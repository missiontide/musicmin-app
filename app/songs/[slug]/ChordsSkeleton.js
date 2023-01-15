import React from "react";
import styles from "../../../styles/Chords.module.css";
import appStyles from '../../../styles/SongSearchBar.module.css';

export default function ChordsSkeleton() {
    return (
        <div>
            <div className={styles.chordsContainer}>
                <div className={styles.chords}>
                    <div className={appStyles.spinnerContainer}>
                        {/* bootstrap <Spinner/> errors if used here, so use div class*/}
                        <div className="spinner-border text-dark"/>
                        <p>Loading Chords...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}