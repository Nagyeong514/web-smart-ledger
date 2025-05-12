import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebcamPage from './pages/WebcamPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/webcam" element={<WebcamPage />} />
            </Routes>
        </Router>
    );
}

export default App;
