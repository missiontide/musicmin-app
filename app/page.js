"use client";

import React from 'react';
import App from '../components/App';

export const revalidate = 3600;

function HomePage() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export default HomePage