import PptxGenJS from "pptxgenjs";
import { titleSlideStyle, lyricSlideStyle } from './slidesStyles.js'
import * as Fathom from "fathom-client";

async function makeSlides(selectedSongs) {
    // get lyrics
    const selectedSongIds = [];
    selectedSongs.forEach(song => selectedSongIds.push(song.id).toString())

    const response = await fetch((process.env.NEXT_PUBLIC_MUSICMIN_DB_HOST) + "/lyrics?songs=" + selectedSongIds.toString());
    const selectedSongLyrics = await response.json();

    // DB pulls songs in id order
    // need to re-order according to user's selection
    const orderedSongLyrics = [];
    selectedSongIds.forEach(songId => {
        orderedSongLyrics.push(
            selectedSongLyrics.find(song => song.id === songId)
        )
    });


    // generate slides using pptxgenjs
    let pres = new PptxGenJS();

    // duplicate handling -- for preserving order
    let usedSongTitles = [];
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    orderedSongLyrics.forEach(songLyric => {
        // add song title
        const songTitle = songLyric.title;
        let sectionTitle = songTitle;

        // duplicate handling ... same title section will ruin order
        let occurrences = countOccurrences(usedSongTitles, songTitle);
        if (occurrences > 0) {sectionTitle = sectionTitle + " (" + occurrences.toString() + ")"}

        pres.addSection({ title: sectionTitle})
        let slide = pres.addSlide({ sectionTitle: sectionTitle});
        slide.addText(songTitle, titleSlideStyle);

        // add song lyrics
        let lyrics = parseLyricsToArray(songLyric['lyrics']);
        lyrics.forEach(lyric => {
            let slide = pres.addSlide({ sectionTitle: sectionTitle});
            slide.addText(lyric, lyricSlideStyle);
        })

        // duplicate handling
        usedSongTitles.push(songTitle);
    })

    // analytics
    Fathom.trackGoal('YMDOEQUB', 0);

    // save the presentation
    await pres.writeFile({fileName: 'musicminapp-worship-slides.pptx'});
}

const LYRICS_DELIMITER = '\r\n---\r\n'

function parseLyricsToArray(lyrics) {
    return lyrics.split(LYRICS_DELIMITER)
}

export default makeSlides;