import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'
import '../styles/SongSearchBar.css'
import React, { useEffect } from 'react';
import Router from 'next/router';
import * as Fathom from 'fathom-client';

// Record a pageview when route changes
Router.events.on('routeChangeComplete', (as, routeProps) => {
    if (!routeProps.shallow) {
        Fathom.trackPageview();
    }
});

function App({ Component, pageProps }) {
    // Initialize Fathom when the app loads
    // useEffect(() => {
    //     Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
    //         // includedDomains: ['www.musicmin.app'],
    //         url: 'https://rain-optimistic.musicmin.app/script.js',
    //     });
    // }, []);

    return <Component {...pageProps} />;
}

export default App;
