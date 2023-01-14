"use client";

import React from "react";
import styles from "../../../styles/App.module.css";
import {Image} from "react-bootstrap";
import RequestSongModal from "../../../components/RequestSongModal";
import Link from "next/link";
import SelectedSongs from "../../../components/SelectedSongs";
import SongSearchBar from "../../../components/SongSearchBar";

export default function AppSkeleton() {
    return (
        <>
            <div className={styles.App}>
                <p className={styles.signature}>
                    made by <a href="https://www.missiontide.com" target="_blank" rel="noreferrer">@missiontide</a>
                </p>

                <RequestSongModal />
                {/* className styling logic moves height of logo and search higher for Chords Pages */}
                <header className={styles.AppHeaderAlt}>
                    <Link href="/"><Image src="/logo.png" alt="logo" fluid /></Link>
                </header>
                <SelectedSongs
                    selectedSongs={0}
                />
                <SongSearchBar
                    songs={[]}
                />
            </div>
        </>
    )
}