import styles from '../styles/SongSearchBar.module.css';

import React from 'react';
import { Table, Button, Spinner, Image, Form } from "react-bootstrap";
import Fuse from 'fuse.js';
import Link from 'next/link';
import {getTagValues, getValuesArray} from "../utils/Tags";

class SongSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchInput: "",
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            searchInput: e.target.value,
        });
    };

    // searches all songs based on searchInput
    // returns a song object array sorted by matching score
    searchSongs(songs) {
        // Fuse search options
        const options = {
            keys: [
                {name: 'title', weight: 0.65},
                {name: 'artist', weight: 0.35}],
            threshold: 0.4,
        }

        const fuseSearch = new Fuse(songs, options)
        const searchResult = fuseSearch.search(this.state.searchInput)

        // fuse returns objects sorted by match .score, the object is in .item
        return searchResult.map(result => result['item'])
    }

    filterSongsByTagsAndTempo(songs, selectedTags, tempo) {
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

    render() {

        const allSongs = this.props.songs;
        let songsToDisplay = [];

        // search
        if (this.state.searchInput.length > 0) {
            // match song titles/artists with search input
            songsToDisplay = this.searchSongs(allSongs);
        }

        // filter
        let filterSelected = (
            this.props.selectedThemes.length > 0
            || this.props.selectedDifficulty !== null
            || this.props.selectedTempo !== null
        );
        if (filterSelected) {
            if (this.state.searchInput.length === 0) {
                songsToDisplay = allSongs; // if no search, show all songs with these filter(s)
            }

            // get tag values array
            let tagValuesArray = [];
            if (this.props.selectedThemes.length > 0) {
                tagValuesArray = getTagValues(this.props.selectedThemes)
            }
            if (this.props.selectedDifficulty) {
                tagValuesArray.push(this.props.selectedDifficulty.value)
            }

            let tempo = this.props.selectedTempo ? this.props.selectedTempo.label : null;
            songsToDisplay = this.filterSongsByTagsAndTempo(songsToDisplay, tagValuesArray, tempo)
        }

        return (
            <div>
                {this.props.selectedDifficulty ? this.props.selectedDifficulty.value : ""}
                {/* Search Bar */}
                <div>
                    <Form.Control
                        className={styles.songSearchBar}
                        type="search"
                        placeholder="type a song or artist..."
                        onChange={this.handleChange}
                        value={this.state.searchInput}
                    />
                </div>
                <div>
                    {/* drop shadow image */}
                    <Image src="/dropshadow.png" alt="drop shadow" fluid />
                </div>

                {/* Initializing loading animation while song list is being pulled from backend */}
                {this.props.songs.length === 0
                    && this.state.searchInput.length > 0
                    && this.props.chordsPage === undefined // if this is a chords page, there's already a loading spinner
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
                            <Table striped borderless className={styles.table + " " + styles.tableStriped}>
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
                                                        onClick={() => this.props.setLoadingChordsPage(true)}
                                                    >{song.title}</Link>
                                                    : song.title}
                                            </td>
                                            <td>{song.artist}</td>
                                            <td>{song.tempo}</td>
                                            <td><AddSongButton
                                                value={song.id}
                                                onClick={() => this.props.onClick(song)}
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
}

function AddSongButton(props) {
    return (
        <Button variant="dark" onClick={props.onClick}>+</Button>
    )
}

export default SongSearchBar;