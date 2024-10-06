import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import './MapPage.css'; // Import CSS for styling

import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ setPosition, navigate }) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng; // Get latitude and longitude from click event
            setMarkerPosition([lat, lng]); // Set marker position
            setPosition([lat, lng]); // Update the position state
            
            // Redirect to OptionsPage with selected location
            console.log("Navigating to OptionsPage with:", { lat, lng, name: "Selected Location" });
            navigate('/options', { state: { location: { lat, lng, name: "Selected Location" } } });
        },
    });

    return markerPosition === null ? null : <Marker position={markerPosition} className="marker marker-animated" />;
};

const MapPage = () => {
    const navigate = useNavigate();
    const [position, setPosition] = useState([51.505, -0.09]); // Default position
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        const provider = new OpenStreetMapProvider();
        provider.search({ query: searchQuery }).then((result) => {
            if (result && result.length > 0) {
                const { y, x } = result[0]; // Get latitude and longitude
                setPosition([y, x]); // Update the position
                
                // Redirect to OptionsPage with selected location
                console.log("Navigating to OptionsPage with search result:", { lat: y, lng: x, name: result[0].label });
                navigate('/options', { state: { location: { lat: y, lng: x, name: result[0].label } } });
            } else {
                alert('Location not found');
            }
        });
    };

    return (
        <div>
            <h1>Map Page</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a location"
            />
            <button onClick={handleSearch}>Search</button>

            <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker setPosition={setPosition} navigate={navigate} />
            </MapContainer>
        </div>
    );
};

export default MapPage;
