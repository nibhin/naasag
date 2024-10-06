import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SisAlertsPage.css'; // Import the CSS file for styling

// Simulated historical risk data for specific geographic areas
const riskData = {
    'Urban Area': [
        { id: 1, description: "High pollution risk due to traffic.", level: "High" },
        { id: 2, description: "Flooding risk from heavy rainfall.", level: "Medium" },
        { id: 3, description: "Traffic congestion expected.", level: "Low" },
        { id: 4, description: "Public transport strikes.", level: "Medium" },
        { id: 5, description: "Vandalism risk in crowded areas.", level: "Low" },
        { id: 6, description: "Noise pollution from construction.", level: "Medium" },
        { id: 7, description: "Risk of petty crime in nightlife areas.", level: "High" },
    ],
    'Rural Area': [
        { id: 8, description: "Wildfire risk during dry seasons.", level: "High" },
        { id: 9, description: "Pest infestation in crops.", level: "Medium" },
        { id: 10, description: "Low risk of flooding.", level: "Low" },
        { id: 11, description: "Drought risk affecting water supply.", level: "High" },
        { id: 12, description: "Isolation during severe weather conditions.", level: "Medium" },
    ],
};

// Function to check if the selected location is in a flood or drought risk area
const checkRiskAreas = (lat, lng) => {
    const risks = [];
    if (lat >= 25 && lat <= 26 && lng >= 88 && lng <= 90) {
        risks.push({ id: 101, description: "Flood risk in this area.", level: "High" });
    }
    if (lat >= 23 && lat <= 25 && lng >= 85 && lng <= 87) {
        risks.push({ id: 102, description: "Drought risk in this area.", level: "High" });
    }
    return risks;
};

const SisAlertsPage = () => {
    const location = useLocation();
    const { selectedLocation } = location.state || { selectedLocation: { lat: 0, lng: 0, name: "Unknown Location" } };

    // Ensure location is valid
    const isValidLocation = selectedLocation.lat !== null && selectedLocation.lng !== null;

    const [risks, setRisks] = useState([]);

    // Function to determine location type or specific region based on lat/lng
    const getLocationType = (lat, lng) => {
        if (lat === 40 && lng === -74) {
            return 'Location_A';
        } else if (lat === 34 && lng === -118) {
            return 'Location_B';
        } else if (lat > 10 && lng > 10) {
            return 'Urban Area';
        } else if (lat < -10 && lng < -10) {
            return 'Rural Area';
        }
        return 'Unknown Location';
    };

    // Fetch risk data when the location changes
    useEffect(() => {
        if (!isValidLocation) {
            console.warn("Invalid location coordinates:", selectedLocation);
            return;
        }

        const locationType = getLocationType(selectedLocation.lat, selectedLocation.lng);
        console.log("Determined Location Type:", locationType);

        // Get risks based on the determined location type (historical risks)
        const risksForLocation = riskData[locationType] || [];

        // Get risks based on proximity (flood or drought-prone regions)
        const proximityRisks = checkRiskAreas(selectedLocation.lat, selectedLocation.lng);

        // Set the risks (combined both types)
        setRisks([...risksForLocation, ...proximityRisks]);
    }, [selectedLocation.lat, selectedLocation.lng, isValidLocation]);

    return (
        <div className="sisl-alerts-container">
            <h2>Risk Alerts for {isValidLocation ? selectedLocation.name : "Unknown Location"}</h2>
            
            {/* Location Details */}
            {isValidLocation && (
                <div className="location-details">
                    <h3>Location Details</h3>
                    <p><strong>Name:</strong> {selectedLocation.name}</p>
                    <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
                    <p><strong>Longitude:</strong> {selectedLocation.lng}</p>
                </div>
            )}

            <h3>Risk Analysis:</h3>
            <ul>
                {risks.length > 0 ? (
                    risks.map((risk) => (
                        <li key={risk.id}>
                            <strong>Level:</strong> {risk.level}<br />
                            <strong>Description:</strong> {risk.description}
                        </li>
                    ))
                ) : (
                    <li>No risk data available for this location.</li>
                )}
            </ul>

            <div className="notification">
                Please take necessary precautions based on the alerts.
            </div>
        </div>
    );
};

export default SisAlertsPage;
