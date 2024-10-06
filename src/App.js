import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import NotFound from './components/NotFound.js'; // Optional 404 component
import MapPage from './components/MapPage.js'; // Import the MapPage component
import OptionsPage from './components/OptionsPage.js'; // Import OptionsPage
import CropSelection from './components/CropSelection.js'; // Import CropSelection component
import IrrigationPage from './components/IrrigationPage.js'; // Import the IrrigationPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} /> {/* Optional: catch-all for 404 */}
        <Route path="/map" element={<MapPage />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/crop-selection" element={<CropSelection />} /> {/* New route for Crop Selection */}
        <Route path="/irrigation" element={<IrrigationPage />} /> {/* New route for Crop Selection */}

      </Routes>
    </Router>
  );
}

export default App;
