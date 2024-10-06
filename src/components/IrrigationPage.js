import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './IrrigationPage.css'; // Import CSS for styling

const IrrigationPage = () => {
    const location = useLocation();
    
    // Safely access the location data from location.state
    const { selectedLocation } = location.state || { selectedLocation: { lat: 0, lng: 0, name: "Unknown Location" } };


    // Initialize state variables
    const [landArea, setLandArea] = useState('');
    const [cropType, setCropType] = useState('');
    const [soilType, setSoilType] = useState('');
    const [month, setMonth] = useState('');
    const [irrigationAmount, setIrrigationAmount] = useState(null);
    const [CPE, setCPE] = useState(''); // New input for CPE (Cumulative Pan Evaporation)
    const [RF, setRF] = useState(''); // New input for RF (Rainfall)

    // Crop-specific Kp and Kc values
    const cropData = {
        'Wheat': { Kp: 0.75, Kc: 0.85 },
        'Rice': { Kp: 0.80, Kc: 1.20 },
        'Corn': { Kp: 0.78, Kc: 1.10 },
        'Barley': { Kp: 0.70, Kc: 0.90 },
        'Potato': { Kp: 0.76, Kc: 1.00 },
        'Tomato': { Kp: 0.77, Kc: 1.15 },
        'Soybean': { Kp: 0.72, Kc: 0.95 },
        'Cucumber': { Kp: 0.79, Kc: 1.05 },
        'Lettuce': { Kp: 0.68, Kc: 0.85 },
        // Add more crops as needed
    };

    // Expanded crop list
    const crops = Object.keys(cropData);

    // Expanded soil types
    const soilTypes = [
        'Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Saline', 'Chalky', 
        'Rocky', 'Alluvial', 'Organic', 'Acidic', 'Alkaline', 
        'Moist', 'Dry'
    ];

    // Constants for crop area and wetting percent
    const area = 3.24; // Spacing of the crop (m²)
    const Wp = 0.4; // Wetting percent (0.4 for wider spacing crops)

    // Function to adjust Kp and Kc dynamically based on crop, soil, and month
    const getIrrigationFactor = (crop, soil, month) => {
        // Get crop-specific Kp and Kc
        const { Kp, Kc } = cropData[crop] || { Kp: 0.75, Kc: 0.85 }; // Default values

        let soilAdjustment = 1.0;
        let monthAdjustment = 1.0;

        // Adjust based on soil type
        switch (soil) {
            case 'Clay': soilAdjustment = 1.2; break; // More water needed for clay
            case 'Sandy': soilAdjustment = 0.8; break; // Less water needed for sandy
            case 'Loamy': soilAdjustment = 1.0; break; // Optimal soil
            case 'Silt': soilAdjustment = 1.1; break; // Slightly more water needed
            default: break;
        }

        // Adjust based on month (seasonal effect)
        if (['June', 'July', 'August'].includes(month)) {
            monthAdjustment = 1.2; // More water needed in hot months
        } else if (['December', 'January', 'February'].includes(month)) {
            monthAdjustment = 0.9; // Less water needed in winter months
        }

        return { Kp, Kc, soilAdjustment, monthAdjustment };
    };

    // Calculation based on the formula provided
    const handleCalculateIrrigation = () => {
        const cpe = parseFloat(CPE);
        const rf = parseFloat(RF);
        const landAreaInAcres = parseFloat(landArea);

        // Ensure CPE, RF, and Land Area are valid numbers
        if (isNaN(cpe) || isNaN(rf) || isNaN(landAreaInAcres) || !cropType || !soilType || !month) {
            alert('Please provide valid inputs for CPE, RF, land area, crop type, soil type, and month.');
            return;
        }

        // Get the adjusted factors for the selected crop, soil, and month
        const { Kp, Kc, soilAdjustment, monthAdjustment } = getIrrigationFactor(cropType, soilType, month);

        // Formula: (CPE – RF) x Kp x Kc x Area x Wp * soilAdjustment * monthAdjustment
        const irrigationFactor = (cpe - rf) * Kp * Kc * area * Wp * soilAdjustment * monthAdjustment;
        const calculatedIrrigation = irrigationFactor * landAreaInAcres; // Apply land area

        setIrrigationAmount(calculatedIrrigation);
    };

    // Display location details, defaulting to "Unknown" if not provided
    const locationName = selectedLocation.name || "Unknown Location";
    const locationLat = selectedLocation.lat || 0;
    const locationLng = selectedLocation.lng || 0;

    return (
        <div className="irrigation-container">
            <h2>Irrigation Suggestions</h2>
            <p><strong>Location:</strong> {locationName}</p>
            <p><strong>Latitude:</strong> {locationLat}</p>
            <p><strong>Longitude:</strong> {locationLng}</p>

            <div className="input-container">
                <label>Land Area (in acres):</label>
                <input
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                />

                <label>Cumulative Pan Evaporation (CPE):</label>
                <input
                    type="number"
                    value={CPE}
                    onChange={(e) => setCPE(e.target.value)}
                />

                <label>Rainfall (RF):</label>
                <input
                    type="number"
                    value={RF}
                    onChange={(e) => setRF(e.target.value)}
                />

                <label>Crop Type:</label>
                <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
                    <option value="">Select Crop</option>
                    {crops.map((crop, index) => (
                        <option key={index} value={crop}>{crop}</option>
                    ))}
                </select>

                <label>Soil Type:</label>
                <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                    <option value="">Select Soil Type</option>
                    {soilTypes.map((soil, index) => (
                        <option key={index} value={soil}>{soil}</option>
                    ))}
                </select>

                <label>Month:</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Select Month</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, index) => (
                        <option key={index} value={m}>{m}</option>
                    ))}
                </select>

                <button onClick={handleCalculateIrrigation}>Calculate Irrigation Amount</button>
            </div>

            {irrigationAmount !== null && (
                <div className="result-container">
                    <h3>Suggested Irrigation Amount:</h3>
                    <p>{irrigationAmount.toFixed(2)} inches</p>
                </div>
            )}

            <Link className="back-button" to="/options">
                <span>Back to Options Page</span>
            </Link>
        </div>
    );
};

export default IrrigationPage;
