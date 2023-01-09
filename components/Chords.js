import styles from '../styles/Chords.module.css';

import React from "react";
import App from "./App";

export default function Chords(props) {
    return (
        <div>
            <div className={styles.chordsContainer}>
                <div className={styles.chords}>
                    <h4>{props.title} - {props.artist}</h4>
                    <br/>
                    {<div dangerouslySetInnerHTML={{ __html: props.chords }} />}
                </div>
            </div>
        </div>
    )
}
