import React from "react";
import App from "../../../components/App";
import Chords from "../../../components/Chords";

export default function Loading() {
    return (
        <>
            <App
                useChordsPageStyling={true}
            />
            <Chords
                title="Loading..."
            />
        </>
    )
}