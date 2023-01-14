import React from "react";
import styles from "../../../styles/Chords.module.css";
import appStyles from '../../../styles/SongSearchBar.module.css';
import { Spinner } from "react-bootstrap";

export default function ChordsSkeleton() {
    return (
        <div>
            <div className={styles.chordsContainer}>
                <div className={styles.chords}>
                    <div className={appStyles.spinnerContainer}>
                        <p>Loading Chords...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}