import React from 'react';
import "@fontsource/montserrat";
import App from '../components/App';
import Head from "next/head";


function HomePage() {
    return (
        <React.StrictMode>
            <Head>
                <title>musicmin.app | Instant Worship Slides</title>
            </Head>
            <App />
        </React.StrictMode>
    );
}

export default HomePage