"use client";

import React from 'react';
import App from '../components/App';

function HomePage() {
    return (
        <React.StrictMode>
            <script src="/html2pdf.bundle.min.js"></script>
            <App />
        </React.StrictMode>
    );
}

export default HomePage