import React from 'react';
import { NextSeo } from 'next-seo';
import App from "../../components/App";
import ApiWrapper from "../../utils/ApiWrapper";
import Chords from "../../components/Chords";

export const Song = (props) => {
    const title = props.title + " - " + props.artist + " Chords | musicmin.app";

    return (
        <React.StrictMode>
            <NextSeo
                title={title}
                openGraph={{
                    type: 'website',
                    url: 'https://www.musicmin.app/songs/' + props.slug,
                    title: title,
                    description: "Make worship slides and chord sheets instantly.",
                    images: [
                        {
                            url: 'https://www.musicmin.app/social-media.png'
                        }
                    ],
                }}
            />
            <App
                useChordsPageStyling={true}
            />
            <Chords
                title={props.title}
                artist={props.artist}
                chords={props.chords}
            />
        </React.StrictMode>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const songData = await ApiWrapper.getSong(slug);
    return {
        props: {
            title: songData.title,
            slug: slug,
            artist: songData.artist,
            chords: songData.chords,
            lyrics: songData.lyrics,
        }
    }
}

export default Song