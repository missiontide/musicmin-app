import React from 'react';
import App from "../../../components/App";
import Chords from "../../../components/Chords";

export const Song = async (props) => {
    return (
        <React.StrictMode>
            <App
                useChordsPageStyling={true}
            />
            <Chords
                slug={props.params.slug}
            />
        </React.StrictMode>
    )
}

export default Song