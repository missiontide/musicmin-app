import PptxGenJS from "pptxgenjs";

/**
 *
 * @param {Array} selectedSongs
 * @param {SlideStyles} slideStyles
 * @returns {Promise<void>}
 */
async function makeSlides(selectedSongs, slideStyles) {
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
    let pptx = new PptxGenJS();
    pptx.defineSlideMaster(slideStyles.getTitleSlideMasterProps());
    pptx.defineSlideMaster(slideStyles.getLyricSlideMasterProps());

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

        pptx.addSection({ title: sectionTitle})
        let slide = pptx.addSlide({ sectionTitle: sectionTitle});
        slide.background = slideStyles.slideBackgroundStyle;
        slide.addText(songTitle, slideStyles.titleSlideTextStyle);

        // add song lyrics
        let lyrics = parseLyricsToArray(songLyric['lyrics']);
        lyrics.forEach(lyric => {
            let slide = pptx.addSlide({ sectionTitle: sectionTitle});
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