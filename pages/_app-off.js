import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PlausibleProvider from 'next-plausible'

export default function MyApp({ Component, pageProps }) {
    return (
        <PlausibleProvider domain="musicmin.app">
            <Component {...pageProps} />
        </PlausibleProvider>
    )
}
