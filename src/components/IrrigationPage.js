import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './IrrigationPage.css'; // Import CSS for styling

const IrrigationPage = () => {
    const location = useLocation();
    const { location: selectedLocation } = location.state || {
        location: { lat: 0, lng: 0, name: "Unknown Location" }
    };

    // Initialize state variables
    const [landArea, setLandArea] = useState('');
    const [cropType, setCropType] = useState('');
    const [soilType, setSoilType] = useState('');
    const [month, setMonth] = useState('');
    const [irrigationAmount, setIrrigationAmount] = useState(null);

    const handleCalculateIrrigation = () => {
        const areaInAcres = parseFloat(landArea);
        const irrigationFactor = getIrrigationFactor(cropType, soilType, month);
        const calculatedIrrigation = areaInAcres * irrigationFactor;

        setIrrigationAmount(calculatedIrrigation);
    };

    const getIrrigationFactor = (crop, soil, month) => {
        // Define irrigation factors based on crop type and soil type
        if (crop === 'Wheat') {
            return 1.5; // Example factor for wheat
        }
        if (crop === 'Rice') {
            return 2.0; // Example factor for rice
        }
        return 1.0; // Default factor if no crop type matches
    };

    // Ensure selectedLocation is defined before accessing its properties
    const locationName = selectedLocation ? selectedLocation.name : "Unknown Location";

    return (
        <div className="irrigation-container">
            <h2>Irrigation Suggestions</h2>
            <p>Location: {locationName}</p>

            <div className="input-container">
                <label>Land Area (in acres):</label>
                <input
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                />

                <label>Crop Type:</label>
                <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
                    <option value="">Select Crop</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    {/* Add more crops as needed */}
                </select>

                <label>Soil Type:</label>
                <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                    <option value="">Select Soil Type</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Silt">Silt</option>
                    <option value="Peaty">Peaty</option>
                    <option value="Saline">Saline</option>
                    <option value="Chalky">Chalky</option>
                    {/* Add more soil types as needed */}
                </select>

                <label>Month:</label>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
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
