import React from 'react';
import App from "../../../components/App";
import Chords from "../../../components/Chords";

export const Song = async (props) => {
    return (
        <React.StrictMode>
            <App
                chordsSlug={props.params.slug}
            />
        </React.StrictMode>
    )
}

export default Song