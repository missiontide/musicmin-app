import React from 'react';
import App from "../../../components/App";
import ApiWrapper from "../../../utils/ApiWrapper";
import Chords from "../../../components/Chords";
import PlausibleProvider from "next-plausible";

export const Song = async (props) => {
    const songData = await getSong(props.params.slug);

    return (
        <PlausibleProvider domain="musicmin.app">
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
        </PlausibleProvider>
    )
}

async function getSong(slug) {
    return await ApiWrapper.getSong(slug);
}

export default Song