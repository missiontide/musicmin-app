import React from 'react';
import "@fontsource/montserrat";
import App from '../components/App';
import Head from "next/head";


function HomePage() {
    return (
        <React.StrictMode>
            <Head>
                <title>musicmin.app | Instant Worship Slides</title>
                <meta property="og:url" content="https://www.musicmin.app" />
                <meta property="og:title" content="musicmin.app - Instant Worship Slides!" />
                <meta property="og:description" content="Never type another worship powerpoint again!" />
                <meta property="og:image" content="https://www.musicmin.app/social-media-card.png" />
                <meta property="og:type" content="website" />
            </Head>
            <App />
        </React.StrictMode>
    );
}

export default HomePage