import React from "react";

export default function Chords(props) {
    return (
        <div>
            {<div dangerouslySetInnerHTML={{ __html: props.chords }} />}
        </div>
    )
}
