import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fontsource/montserrat";
// import './index.css';
import App from '../components/App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

function HomePage() {
    // const root = ReactDOM.createRoot(document.getElementById('root'));
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    // return <div>Welcome to Next.js!</div>
}

export default HomePage

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();