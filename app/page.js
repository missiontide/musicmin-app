"use client";

import React from 'react';
import App from '../components/App';
import PlausibleProvider from "next-plausible";

function HomePage() {
    return (
        <PlausibleProvider domain="musicmin.app">
        <React.StrictMode>
            <App />
        </React.StrictMode>
        </PlausibleProvider>
    );
}

export default HomePage