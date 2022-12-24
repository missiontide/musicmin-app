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
                <meta property="og:title" content="Instant Worship Slides" />
                <meta property="og:description" content="Let us take care of the .ppt, you focus on worshipping. 🙏" />
                <meta property="og:image" content="https://www.musicmin.app/social-media.png" />
                <meta property="og:type" content="website" />
            </Head>
            <App />
        </React.StrictMode>
    );
}

export default HomePage