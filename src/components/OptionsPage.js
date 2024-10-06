import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./OptionsPage.css"; // Import the CSS file for styling

const OptionsPage = () => {
  const location = useLocation();
  const { location: selectedLocation } = location.state || {
    location: { lat: 0, lng: 0, name: "Unknown Location" },
  };

  return (
    <div className="options-container">
      <h2>Selected Location</h2>
      <p>Location Name: {selectedLocation.name}</p>
      <p>Latitude: {selectedLocation.lat}</p>
      <p>Longitude: {selectedLocation.lng}</p>

      <h3>Select an Option:</h3>
      <div className="button-container">
        <Link
          className="option-button"
          to="/crop-selection"
          state={{ selectedLocation }}
        >
          <span>
            Crop Selection: Location (for climate), Time of Year, Soil Type and
            Moisture Levels
          </span>
        </Link>
        <Link
          className="option-button"
          to="/irrigation"
          state={{ selectedLocation }}
        >
          <span>
            Irrigation: How Much Water at What Time and at Which Part of Land,
            Schedules
          </span>
        </Link>
        <Link
          className="option-button"
          to="/sisalerts"
          state={{ selectedLocation }}
        >
          <span>
            Risk Alerts: Alerts Based on Events Like Floods, Extreme Heat,
            Climate Data
          </span>
        </Link>
      </div>

      {/* Back Button */}
      <Link className="back-button" to="/map">
        <span>Back to Map Page</span>
      </Link>
    </div>
  );
};

export default OptionsPage;
