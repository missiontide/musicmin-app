import ApiWrapper from "./ApiWrapper";

/**
 *
 * @param {Array} selectedSongs
 * @returns {Promise<void>}
 */
async function makeChords(selectedSongs) {
    // get lyrics from API
    const selectedSongIds = [];
    selectedSongs.forEach(song => selectedSongIds.push(song.id))
    const selectedSongChords = await ApiWrapper.getChords(selectedSongIds)

    // DB pulls songs in id order
    // need to re-order according to user's selection
    const orderedSongChords = [];
    selectedSongIds.forEach(songId => {
        orderedSongChords.push(
            selectedSongChords.find(song => song.id === songId)
        )
    });


    let chordsHtmlString = '';

    orderedSongChords.forEach((songChord, idx) => {
        if (idx > 0) {
            // html2pdf uses this to create a new page
            chordsHtmlString += '<div style="page-break-before: always;"></div>';
        }
        let titleAndArtistHtmlString = getTitleAndArtistHtmlString(songChord.title, songChord.artist);
        let styledChordsHtmlString = wrapInChordsStyleDiv(songChord.chords);
        chordsHtmlString +=  titleAndArtistHtmlString + styledChordsHtmlString;
    })

    // generate .pdf using html2pdf
    html2pdf(chordsHtmlString, {
        margin: 10,
        filename: 'musicminapp-chords.pdf',
    });
}

function getTitleAndArtistHtmlString(title, artist) {
    return '<div style="font-family: Arial,serif">' +
        '<h5>' + title + ' - ' + artist + '</h5>' +
        '</div>'
}

function wrapInChordsStyleDiv(htmlString) {
    let chordsStyleDivString = '<div style="font-family: monospace; font-size: 12px;">';
    return chordsStyleDivString + htmlString + '</div>'
}

export default makeChords;