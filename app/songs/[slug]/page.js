import React from 'react';
import App from "../../../components/App";
import ApiWrapper from "../../../utils/ApiWrapper";
import Chords from "../../../components/Chords";

export const Song = async (props) => {
    const songData = await getSong(props.params.slug);

    return (
        <React.StrictMode>
            <App
                useChordsPageStyling={true}
            />
            <Chords
                title={songData.title}
                artist={songData.artist}
                chords={songData.chords}
            />
        </React.StrictMode>
    )
}

async function getSong(slug) {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    return await ApiWrapper.getSong(slug);
}

export default Song