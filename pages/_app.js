import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'
import '../styles/SongSearchBar.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        // Initialize Fathom when the app loads
        Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
            includedDomains: ['www.musicmin.app'],
        });

        function onRouteChangeComplete() {
            Fathom.trackPageview();
        }
        // Record a pageview when route changes
        router.events.on('routeChangeComplete', onRouteChangeComplete);

        // Unassign event listener
        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete);
        };
    }, []);

    return <Component {...pageProps} />;
}

export default App;