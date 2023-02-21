import React from 'react';
import App from "../../../components/App";
import Chords from "../../../components/Chords";

export const Song = async (props) => {
    return (
        <React.StrictMode>
            <script src="/html2pdf.bundle.min.js"></script>
            <App
                chordsSlug={props.params.slug}
            />
        </React.StrictMode>
    )
}

export default Song