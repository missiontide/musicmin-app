import PptxGenJS from "pptxgenjs";
import ApiWrapper from "./ApiWrapper";

/**
 *
 * @param {Array} selectedSongs
 * @param {SlideStyles} slideStyles
 * @returns {Promise<void>}
 */
async function makeSlides(selectedSongs, slideStyles) {
    // get lyrics from API
    const selectedSongIds = [];
    selectedSongs.forEach(song => selectedSongIds.push(song.id))
    const selectedSongLyrics = await ApiWrapper.getLyrics(selectedSongIds)

    // DB pulls songs in id order
    // need to re-order according to user's selection
    const orderedSongLyrics = [];
    selectedSongIds.forEach(songId => {
        orderedSongLyrics.push(
            selectedSongLyrics.find(song => song.id === songId)
        )
    });

    // generate slides using pptxgenjs
    let pptx = new PptxGenJS();
    pptx.defineSlideMaster(slideStyles.getTitleSlideMasterProps());
    pptx.defineSlideMaster(slideStyles.getLyricSlideMasterProps());

    // duplicate handling -- for preserving order
    let usedSongTitles = [];
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    orderedSongLyrics.forEach(songLyric => {
        // add song title
        let songTitle = songLyric.title;
        let sectionTitle = songTitle;

        // duplicate handling ... same title section will ruin order
        let occurrences = countOccurrences(usedSongTitles, songTitle);
        if (occurrences > 0) {sectionTitle = sectionTitle + " (" + occurrences.toString() + ")"}

        // add section
        pptx.addSection({ title: sectionTitle})

        // add title slide
        let slide = pptx.addSlide({ sectionTitle: sectionTitle});
        slide.background = slideStyles.slideBackgroundStyle;
        // all caps handling
        if (slideStyles.allCaps === true) {songTitle = songTitle.toUpperCase()}
        slide.addText(songTitle, slideStyles.titleSlideTextStyle);

        // add lyrics slides
        let lyrics = parseLyricsToArray(songLyric['lyrics']);
        lyrics.forEach(lyric => {
            let slide = pptx.addSlide({ sectionTitle: sectionTitle});
            // all caps handling
            if (slideStyles.allCaps === true) {lyric = lyric.toUpperCase()}
            slide.addText(lyric, slideStyles.lyricSlideTextStyle);
            slide.background = slideStyles.slideBackgroundStyle;
        })

        // duplicate handling
        usedSongTitles.push(songTitle);
    })

    // save the presentation
    await pptx.writeFile({fileName: 'musicminapp-worship-slides.pptx'});
}

const LYRICS_DELIMITER = '\n---\n'

function parseLyricsToArray(lyrics) {
    return lyrics.split(LYRICS_DELIMITER)
}

export default makeSlides;