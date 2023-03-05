import styles from '../styles/SongSearchBar.module.css';
import filterStyles from "../styles/SearchFilter.module.css";

import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Image, Form } from "react-bootstrap";
import Fuse from 'fuse.js';
import Link from 'next/link';
import {DIFFICULTIES, getTagValues, TEMPOS, THEMES} from "../utils/Tags";
import SearchFilter from "./SearchFilter";

export default function SongSearchBar(props){
    const [searchInput, setSearchInput] = useState("");
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedTempo, setSelectedTempo] = useState(null);

    // searches all songs based on searchInput
    // returns a song object array sorted by matching score
    function searchSongs(songs) {
        // Fuse search options
        const options = {
            keys: [
                {name: 'title', weight: 0.65},
                {name: 'artist', weight: 0.35}],
            threshold: 0.4,
        }

        const fuseSearch = new Fuse(songs, options)
        const searchResult = fuseSearch.search(searchInput)

        // fuse returns objects sorted by match .score, the object is in .item
        return searchResult.map(result => result['item'])
    }

    function filterSongsByTagsAndTempo(songs, selectedTags, tempo) {
        return songs.filter(
            song => {
                if (tempo !== null) {
                    if (tempo !== song.tempo) {
                        return false
                    }
                }

                let tag_ids = JSON.parse(song.tag_ids);
                // check if tag_ids contains every element of selectedTags
                return selectedTags.every(v => tag_ids.includes(v))
            }
        )
    }

    const allSongs = props.songs;
    let songsToDisplay = [];

    // search
    if (searchInput.length > 0) {
        // match song titles/artists with search input
        songsToDisplay = searchSongs(allSongs);
    }

    // filter
    let filterSelected = (
        selectedThemes.length > 0
        || selectedDifficulty !== null
        || selectedTempo !== null
    );
    if (filterSelected) {
        if (searchInput.length === 0) {
            songsToDisplay = allSongs; // if no search, show all songs with these filter(s)
        }

        // get tag values array
        let tagValuesArray = [];
        if (selectedThemes.length > 0) {
            tagValuesArray = getTagValues(selectedThemes)
        }
        if (selectedDifficulty) {
            tagValuesArray.push(selectedDifficulty.value)
        }

        let tempo = selectedTempo ? selectedTempo.value : null;
        songsToDisplay = filterSongsByTagsAndTempo(songsToDisplay, tagValuesArray, tempo)
    }

    return (
        <div>
            {/* Search Bar */}
            <div>
                <Form.Control
                    className={styles.songSearchBar}
                    type="search"
                    placeholder="type a song or artist..."
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
            </div>
            <div>
                {/* drop shadow image */}
                <Image src="/dropshadow.png" alt="drop shadow" fluid />
            </div>
            <div className={
                styles.whiteLine
                + (props.chordsPage !== undefined ? " " + styles.whiteLineChordsPage : "")
            }></div>

            {/* Filtering */}
            <div className={filterStyles.filtersContainer}>
                <SearchFilter
                    options={THEMES}
                    placeholder={"Theme(s)"}
                    selectedOptions={selectedThemes}
                    setSelectedOptions={setSelectedThemes}
                    className={filterStyles.themesFilter}
                    isMulti={true}
                    isSearchable={true}
                    isClearable={false}
                    isOptionDisabled={() => selectedThemes.length >= 2}
                />
                <SearchFilter
                    options={DIFFICULTIES}
                    placeholder={"Difficulty"}
                    selectedOptions={selectedDifficulty}
                    setSelectedOptions={setSelectedDifficulty}
                    className={filterStyles.difficultyFilter}
                    isMulti={false}
                    isSearchable={false}
                    isClearable={true}
                />
                <SearchFilter
                    options={TEMPOS}
                    placeholder={"Tempo"}
                    selectedOptions={selectedTempo}
                    setSelectedOptions={setSelectedTempo}
                    className={filterStyles.tempoFilter}
                    isMulti={false}
                    isSearchable={false}
                    isClearable={true}
                />
            </div>

            {/* Initializing loading animation while song list is being pulled from backend */}
            {props.songs.length === 0
                && searchInput.length > 0
                && props.chordsPage === undefined // if this is a chords page, there's already a loading spinner
                && (
                <div className={styles.spinnerContainer}>
                    <Spinner animation="border" variant="light" />
                    <p>Loading Songs...</p>
                </div>
            )}

            {/* Table of Song Results */}
            {songsToDisplay.length !== 0 &&
                (<div className={styles.divThatEnclosesTable}>
                    <div className={styles.tableWrapper}>
                        <Table striped borderless size="sm" className={styles.table + " " + styles.tableStriped}>
                            <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Tempo</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {songsToDisplay.map((song, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {song.has_chords
                                                ? <Link
                                                    href={"/songs/"+song.slug}
                                                    onClick={() => props.setLoadingChordsPage(true)}
                                                >{song.title}</Link>
                                                : song.title}
                                        </td>
                                        <td>{song.artist}</td>
                                        <td>{song.tempo}</td>
                                        <td><AddSongButton
                                            value={song.id}
                                            onClick={() => props.onClick(song)}
                                        /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div>)
            }
        </div>
    )
}

function AddSongButton(props) {
    return (
        <Button variant="dark" onClick={props.onClick}>+</Button>
    )
}
