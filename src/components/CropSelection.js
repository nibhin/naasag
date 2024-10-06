import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Ensure this line is present

import './CropSelection.css'; // Import the CSS file

const CropSelection = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const location = useLocation();
    const { selectedLocation } = location.state || { selectedLocation: { lat: 0, lng: 0, name: "Unknown Location" } };

    const [soilType, setSoilType] = useState('');
    const [moistureLevel, setMoistureLevel] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [recommendedCrops, setRecommendedCrops] = useState([]);

    // Suitable crops data for each soil type, moisture level, and month
    const suitableCrops = {
        sandy: {
            low: {
                January: ['Watermelon', 'Pumpkin', 'Sorghum'],
                February: ['Pumpkin', 'Chili', 'Garlic'],
                March: ['Sorghum', 'Cabbage', 'Tomato'],
                April: ['Cabbage', 'Tomato', 'Chili'],
                May: ['Tomato', 'Eggplant', 'Bell Pepper'],
                June: ['Eggplant', 'Spinach', 'Peas'],
                July: ['Spinach', 'Chili', 'Zucchini'],
                August: ['Peas', 'Chili', 'Bell Pepper'],
                September: ['Chili', 'Garlic', 'Onion'],
                October: ['Garlic', 'Carrot', 'Pumpkin'],
                November: ['Carrot', 'Onion', 'Turnip'],
                December: ['Turnip', 'Radish', 'Broccoli'],
            },
            medium: {
                January: ['Cantaloupe', 'Sweet Potato', 'Carrot'],
                February: ['Pineapple', 'Spinach', 'Tomato'],
                March: ['Sweet Potato', 'Tomato', 'Zucchini'],
                April: ['Barley', 'Cucumber', 'Bell Pepper'],
                May: ['Cucumber', 'Tomato', 'Eggplant'],
                June: ['Lettuce', 'Zucchini', 'Spinach'],
                July: ['Zucchini', 'Cabbage', 'Radish'],
                August: ['Bell Pepper', 'Onion', 'Garlic'],
                September: ['Radish', 'Spinach', 'Broccoli'],
                October: ['Squash', 'Chard', 'Carrot'],
                November: ['Onion', 'Garlic', 'Radish'],
                December: ['Broccoli', 'Cabbage', 'Garlic'],
            },
            high: {
                January: ['Rice', 'Tomato', 'Pepper'],
                February: ['Tomato', 'Spinach', 'Basil'],
                March: ['Spinach', 'Cabbage', 'Carrot'],
                April: ['Cabbage', 'Spinach', 'Bell Pepper'],
                May: ['Pepper', 'Basil', 'Eggplant'],
                June: ['Basil', 'Parsley', 'Mint'],
                July: ['Parsley', 'Bell Pepper', 'Chili'],
                August: ['Parsley', 'Mint', 'Chives'],
                September: ['Mint', 'Chives', 'Oregano'],
                October: ['Oregano', 'Thyme', 'Chives'],
                November: ['Thyme', 'Sage', 'Mint'],
                December: ['Chives', 'Thyme', 'Cilantro'],
            },
            'very-high': {
                January: ['Cotton', 'Peas', 'Chili'],
                February: ['Chili', 'Eggplant', 'Tomato'],
                March: ['Eggplant', 'Bitter Gourd', 'Pumpkin'],
                April: ['Bitter Gourd', 'Chili', 'Pepper'],
                May: ['Pepper', 'Chili', 'Okra'],
                June: ['Squash', 'Okra', 'Zucchini'],
                July: ['Okra', 'Soya Beans', 'Sweet Corn'],
                August: ['Soya Beans', 'Sweet Corn', 'Pumpkin'],
                September: ['Sweet Corn', 'Turmeric', 'Garlic'],
                October: ['Turmeric', 'Garlic', 'Onion'],
                November: ['Garlic', 'Onion', 'Radish'],
                December: ['Onion', 'Radish', 'Thyme'],
            },
        },
        clay: {
            low: {
                January: ['Barley', 'Oats', 'Peas'],
                February: ['Oats', 'Millet', 'Chickpeas'],
                March: ['Peas', 'Chickpeas', 'Mustard'],
                April: ['Millet', 'Mustard', 'Pumpkin'],
                May: ['Chickpeas', 'Mustard', 'Carrot'],
                June: ['Mustard', 'Pumpkin', 'Garlic'],
                July: ['Pumpkin', 'Cabbage', 'Carrot'],
                August: ['Cabbage', 'Garlic', 'Radish'],
                September: ['Carrot', 'Radish', 'Spinach'],
                October: ['Cauliflower', 'Spinach', 'Turnip'],
                November: ['Radish', 'Turnip', 'Spinach'],
                December: ['Spinach', 'Garlic', 'Kale'],
            },
            medium: {
                January: ['Soybean', 'Sunflower', 'Taro'],
                February: ['Sunflower', 'Beetroot', 'Kale'],
                March: ['Taro', 'Kale', 'Pumpkin'],
                April: ['Beetroot', 'Kale', 'Garlic'],
                May: ['Kale', 'Garlic', 'Cabbage'],
                June: ['Broccoli', 'Cabbage', 'Spinach'],
                July: ['Spinach', 'Cabbage', 'Tomato'],
                August: ['Cucumber', 'Tomato', 'Bell Pepper'],
                September: ['Bell Pepper', 'Radish', 'Zucchini'],
                October: ['Zucchini', 'Radish', 'Garlic'],
                November: ['Garlic', 'Spinach', 'Kale'],
                December: ['Radish', 'Kale', 'Lettuce'],
            },
            high: {
                January: ['Sugarcane', 'Potato', 'Tomato'],
                February: ['Potato', 'Tomato', 'Pepper'],
                March: ['Tomato', 'Carrot', 'Bell Pepper'],
                April: ['Carrot', 'Bell Pepper', 'Garlic'],
                May: ['Bell Pepper', 'Garlic', 'Eggplant'],
                June: ['Garlic', 'Spinach', 'Chard'],
                July: ['Spinach', 'Chard', 'Eggplant'],
                August: ['Chard', 'Eggplant', 'Radishes'],
                September: ['Radishes', 'Spinach', 'Tomato'],
                October: ['Tomato', 'Radishes', 'Garlic'],
                November: ['Radishes', 'Garlic', 'Onion'],
                December: ['Onion', 'Garlic', 'Thyme'],
            },
            'very-high': {
                January: ['Onions', 'Garlic', 'Pumpkin'],
                February: ['Garlic', 'Pumpkin', 'Cabbage'],
                March: ['Pumpkin', 'Cabbage', 'Lettuce'],
                April: ['Cabbage', 'Lettuce', 'Spinach'],
                May: ['Spinach', 'Tomato', 'Chard'],
                June: ['Chard', 'Tomato', 'Kale'],
                July: ['Kale', 'Tomato', 'Radish'],
                August: ['Radish', 'Garlic', 'Chard'],
                September: ['Chard', 'Garlic', 'Thyme'],
                October: ['Thyme', 'Kale', 'Radishes'],
                November: ['Radishes', 'Thyme', 'Garlic'],
                December: ['Garlic', 'Thyme', 'Chives'],
            },
        },
        loamy: {
            low: {
                January: ['Carrot', 'Lettuce', 'Bell Pepper'],
                February: ['Lettuce', 'Eggplant', 'Tomato'],
                March: ['Eggplant', 'Tomato', 'Zucchini'],
                April: ['Tomato', 'Zucchini', 'Cucumber'],
                May: ['Zucchini', 'Cucumber', 'Corn'],
                June: ['Cucumber', 'Corn', 'Carrot'],
                July: ['Corn', 'Carrot', 'Peas'],
                August: ['Peas', 'Herbs', 'Bell Pepper'],
                September: ['Herbs', 'Bell Pepper', 'Tomato'],
                October: ['Pumpkins', 'Squash', 'Garlic'],
                November: ['Squash', 'Garlic', 'Carrots'],
                December: ['Carrots', 'Radishes', 'Peas'],
            },
            medium: {
                January: ['Corn', 'Wheat', 'Barley'],
                February: ['Wheat', 'Barley', 'Pumpkin'],
                March: ['Pumpkin', 'Quinoa', 'Chard'],
                April: ['Quinoa', 'Basil', 'Cabbage'],
                May: ['Basil', 'Chard', 'Tomato'],
                June: ['Tomato', 'Pumpkin', 'Peas'],
                July: ['Peas', 'Beans', 'Lettuce'],
                August: ['Beans', 'Lettuce', 'Corn'],
                September: ['Lettuce', 'Radish', 'Squash'],
                October: ['Squash', 'Pumpkin', 'Spinach'],
                November: ['Spinach', 'Garlic', 'Radish'],
                December: ['Garlic', 'Radish', 'Thyme'],
            },
            high: {
                January: ['Lettuce', 'Tomato', 'Spinach'],
                February: ['Tomato', 'Spinach', 'Chard'],
                March: ['Chard', 'Basil', 'Pepper'],
                April: ['Pepper', 'Eggplant', 'Cucumber'],
                May: ['Cucumber', 'Pumpkin', 'Beans'],
                June: ['Beans', 'Peas', 'Corn'],
                July: ['Corn', 'Herbs', 'Tomato'],
                August: ['Tomato', 'Herbs', 'Squash'],
                September: ['Squash', 'Radish', 'Chard'],
                October: ['Chard', 'Garlic', 'Herbs'],
                November: ['Herbs', 'Garlic', 'Thyme'],
                December: ['Thyme', 'Radishes', 'Carrots'],
            },
            'very-high': {
                January: ['Tomato', 'Bell Pepper', 'Corn'],
                February: ['Corn', 'Bell Pepper', 'Zucchini'],
                March: ['Zucchini', 'Eggplant', 'Carrot'],
                April: ['Carrot', 'Garlic', 'Pumpkin'],
                May: ['Pumpkin', 'Lettuce', 'Beans'],
                June: ['Beans', 'Squash', 'Cucumber'],
                July: ['Cucumber', 'Squash', 'Pepper'],
                August: ['Pepper', 'Tomato', 'Herbs'],
                September: ['Herbs', 'Corn', 'Squash'],
                October: ['Squash', 'Radish', 'Thyme'],
                November: ['Thyme', 'Radish', 'Lettuce'],
                December: ['Lettuce', 'Radishes', 'Carrots'],
            },
        },
        silty: {
            low: {
                January: ['Potato', 'Onion', 'Cabbage'],
                February: ['Onion', 'Cabbage', 'Carrot'],
                March: ['Cabbage', 'Carrot', 'Lettuce'],
                April: ['Lettuce', 'Beetroot', 'Spinach'],
                May: ['Spinach', 'Kale', 'Chard'],
                June: ['Kale', 'Chard', 'Tomato'],
                July: ['Tomato', 'Bell Pepper', 'Herbs'],
                August: ['Herbs', 'Bell Pepper', 'Squash'],
                September: ['Squash', 'Chard', 'Radish'],
                October: ['Radish', 'Garlic', 'Thyme'],
                November: ['Thyme', 'Garlic', 'Onion'],
                December: ['Onion', 'Carrot', 'Radish'],
            },
            medium: {
                January: ['Lettuce', 'Beetroot', 'Herbs'],
                February: ['Herbs', 'Cabbage', 'Tomato'],
                March: ['Tomato', 'Carrot', 'Zucchini'],
                April: ['Zucchini', 'Pumpkin', 'Corn'],
                May: ['Corn', 'Chard', 'Beans'],
                June: ['Beans', 'Peas', 'Squash'],
                July: ['Squash', 'Tomato', 'Herbs'],
                August: ['Herbs', 'Radish', 'Lettuce'],
                September: ['Lettuce', 'Chard', 'Garlic'],
                October: ['Garlic', 'Pumpkin', 'Onion'],
                November: ['Onion', 'Radish', 'Thyme'],
                December: ['Thyme', 'Radish', 'Kale'],
            },
            high: {
                January: ['Pumpkin', 'Spinach', 'Chard'],
                February: ['Chard', 'Tomato', 'Pepper'],
                March: ['Pepper', 'Carrot', 'Beans'],
                April: ['Beans', 'Corn', 'Pumpkin'],
                May: ['Pumpkin', 'Tomato', 'Garlic'],
                June: ['Garlic', 'Lettuce', 'Spinach'],
                July: ['Spinach', 'Herbs', 'Chard'],
                August: ['Chard', 'Garlic', 'Radish'],
                September: ['Radish', 'Tomato', 'Bell Pepper'],
                October: ['Bell Pepper', 'Garlic', 'Chard'],
                November: ['Chard', 'Garlic', 'Thyme'],
                December: ['Thyme', 'Garlic', 'Kale'],
            },
            'very-high': {
                January: ['Garlic', 'Onion', 'Chard'],
                February: ['Chard', 'Tomato', 'Bell Pepper'],
                March: ['Bell Pepper', 'Lettuce', 'Carrot'],
                April: ['Carrot', 'Zucchini', 'Squash'],
                May: ['Squash', 'Tomato', 'Beans'],
                June: ['Beans', 'Peas', 'Lettuce'],
                July: ['Lettuce', 'Herbs', 'Radish'],
                August: ['Radish', 'Chard', 'Garlic'],
                September: ['Garlic', 'Chard', 'Tomato'],
                October: ['Tomato', 'Onion', 'Thyme'],
                November: ['Thyme', 'Radish', 'Garlic'],
                December: ['Garlic', 'Radishes', 'Onion'],
            },
        },
        peaty: {
            low: {
                January: ['Mushrooms', 'Sphagnum Moss', 'Carnivorous Plants'],
                February: ['Carnivorous Plants', 'Ferns', 'Moss'],
                March: ['Moss', 'Ferns', 'Wild Blueberries'],
                April: ['Wild Blueberries', 'Chives', 'Watercress'],
                May: ['Watercress', 'Chives', 'Bamboo Shoots'],
                June: ['Bamboo Shoots', 'Moss', 'Pumpkin'],
                July: ['Pumpkin', 'Mushrooms', 'Spinach'],
                August: ['Spinach', 'Chard', 'Bamboo Shoots'],
                September: ['Bamboo Shoots', 'Chard', 'Pumpkin'],
                October: ['Pumpkin', 'Herbs', 'Wild Blueberries'],
                November: ['Wild Blueberries', 'Moss', 'Chives'],
                December: ['Chives', 'Moss', 'Ferns'],
            },
            medium: {
                January: ['Watercress', 'Chives', 'Moss'],
                February: ['Moss', 'Ferns', 'Herbs'],
                March: ['Herbs', 'Chives', 'Pumpkin'],
                April: ['Pumpkin', 'Spinach', 'Chard'],
                May: ['Chard', 'Spinach', 'Wild Blueberries'],
                June: ['Wild Blueberries', 'Ferns', 'Mushrooms'],
                July: ['Mushrooms', 'Chives', 'Bamboo Shoots'],
                August: ['Bamboo Shoots', 'Watercress', 'Chives'],
                September: ['Chives', 'Ferns', 'Herbs'],
                October: ['Herbs', 'Ferns', 'Watercress'],
                November: ['Watercress', 'Moss', 'Chives'],
                December: ['Chives', 'Ferns', 'Bamboo Shoots'],
            },
            high: {
                January: ['Mushrooms', 'Sphagnum Moss', 'Carnivorous Plants'],
                February: ['Carnivorous Plants', 'Ferns', 'Moss'],
                March: ['Moss', 'Ferns', 'Wild Blueberries'],
                April: ['Wild Blueberries', 'Chives', 'Watercress'],
                May: ['Watercress', 'Chives', 'Bamboo Shoots'],
                June: ['Bamboo Shoots', 'Moss', 'Pumpkin'],
                July: ['Pumpkin', 'Mushrooms', 'Spinach'],
                August: ['Spinach', 'Chard', 'Bamboo Shoots'],
                September: ['Bamboo Shoots', 'Chard', 'Pumpkin'],
                October: ['Pumpkin', 'Herbs', 'Wild Blueberries'],
                November: ['Wild Blueberries', 'Moss', 'Chives'],
                December: ['Chives', 'Moss', 'Ferns'],
            },
            'very-high': {
                January: ['Mushrooms', 'Sphagnum Moss', 'Carnivorous Plants'],
                February: ['Carnivorous Plants', 'Ferns', 'Moss'],
                March: ['Moss', 'Ferns', 'Wild Blueberries'],
                April: ['Wild Blueberries', 'Chives', 'Watercress'],
                May: ['Watercress', 'Chives', 'Bamboo Shoots'],
                June: ['Bamboo Shoots', 'Moss', 'Pumpkin'],
                July: ['Pumpkin', 'Mushrooms', 'Spinach'],
                August: ['Spinach', 'Chard', 'Bamboo Shoots'],
                September: ['Bamboo Shoots', 'Chard', 'Pumpkin'],
                October: ['Pumpkin', 'Herbs', 'Wild Blueberries'],
                November: ['Wild Blueberries', 'Moss', 'Chives'],
                December: ['Chives', 'Moss', 'Ferns'],
            },
        },
        chalky: {
            low: {
                January: ['Cabbage', 'Carrot', 'Turnip'],
                February: ['Carrot', 'Beetroot', 'Garlic'],
                March: ['Garlic', 'Spinach', 'Peas'],
                April: ['Peas', 'Lettuce', 'Radish'],
                May: ['Radish', 'Herbs', 'Zucchini'],
                June: ['Zucchini', 'Tomato', 'Bell Pepper'],
                July: ['Bell Pepper', 'Cucumber', 'Pumpkin'],
                August: ['Pumpkin', 'Squash', 'Melon'],
                September: ['Melon', 'Corn', 'Lettuce'],
                October: ['Lettuce', 'Herbs', 'Carrot'],
                November: ['Carrot', 'Garlic', 'Onion'],
                December: ['Onion', 'Chives', 'Parsley'],
            },
            medium: {
                January: ['Garlic', 'Carrot', 'Spinach'],
                February: ['Onion', 'Spinach', 'Peas'],
                March: ['Peas', 'Radish', 'Cabbage'],
                April: ['Cabbage', 'Herbs', 'Tomato'],
                May: ['Tomato', 'Bell Pepper', 'Zucchini'],
                June: ['Zucchini', 'Cucumber', 'Pumpkin'],
                July: ['Pumpkin', 'Squash', 'Bell Pepper'],
                August: ['Bell Pepper', 'Corn', 'Melon'],
                September: ['Melon', 'Lettuce', 'Chard'],
                October: ['Chard', 'Garlic', 'Onion'],
                November: ['Onion', 'Thyme', 'Chives'],
                December: ['Chives', 'Parsley', 'Thyme'],
            },
            high: {
                January: ['Carrot', 'Onion', 'Radish'],
                February: ['Radish', 'Garlic', 'Peas'],
                March: ['Peas', 'Spinach', 'Tomato'],
                April: ['Tomato', 'Bell Pepper', 'Chard'],
                May: ['Chard', 'Zucchini', 'Pumpkin'],
                June: ['Pumpkin', 'Corn', 'Squash'],
                July: ['Squash', 'Lettuce', 'Bell Pepper'],
                August: ['Bell Pepper', 'Tomato', 'Melon'],
                September: ['Melon', 'Garlic', 'Thyme'],
                October: ['Thyme', 'Chives', 'Onion'],
                November: ['Onion', 'Parsley', 'Carrot'],
                December: ['Carrot', 'Thyme', 'Chives'],
            },
            'very-high': {
                January: ['Spinach', 'Cabbage', 'Tomato'],
                February: ['Cabbage', 'Tomato', 'Zucchini'],
                March: ['Zucchini', 'Cucumber', 'Corn'],
                April: ['Cucumber', 'Corn', 'Carrot'],
                May: ['Corn', 'Herbs', 'Bell Pepper'],
                June: ['Herbs', 'Bell Pepper', 'Tomato'],
                July: ['Tomato', 'Carrot', 'Squash'],
                August: ['Squash', 'Garlic', 'Onion'],
                September: ['Onion', 'Garlic', 'Chives'],
                October: ['Chives', 'Garlic', 'Thyme'],
                November: ['Thyme', 'Chives', 'Parsley'],
                December: ['Parsley', 'Thyme', 'Basil'],
            },
        },
    }

    const handleSoilChange = (e) => {
        setSoilType(e.target.value);
    };

    const handleMoistureChange = (e) => {
        setMoistureLevel(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const getSuitableCrop = () => {
        if (soilType && moistureLevel && selectedMonth) {
            return suitableCrops[soilType]?.[moistureLevel]?.[selectedMonth] || 'No suitable crop found';
        }
        return 'Please select soil type, moisture level, and month';
    };

    useEffect(() => {
        // Logic to fetch crop data from an API (if necessary) can be placed here
        // Currently, we're using local data based on selections
        const crops = getSuitableCrop();
        setRecommendedCrops(Array.isArray(crops) ? crops : []);
    }, [soilType, moistureLevel, selectedMonth]);
    const handleBackButtonClick = () => {
        navigate('/options'); // Redirect to the options page
    };

    return (
        <div className="crop-selection-container">
            <h2>Location Details</h2>
            <p><strong>Location Name:</strong> {selectedLocation.name}</p>
            <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
            <p><strong>Longitude:</strong> {selectedLocation.lng}</p>

            <h3>Select Soil Type:</h3>
            <select value={soilType} onChange={handleSoilChange}>
                <option value="">Select Soil Type</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="loamy">Loamy</option>
                <option value="silty">Silty</option>
                <option value="peaty">Peaty</option>
                <option value="chalky">Chalky</option>
            </select>

            <h3>Select Moisture Level:</h3>
            <select value={moistureLevel} onChange={handleMoistureChange}>
                <option value="">Select Moisture Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="very-high">Very High</option>
            </select>

            <h3>Select Month:</h3>
            <select value={selectedMonth} onChange={handleMonthChange}>
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

            <h3>Recommended Crop:</h3>
            <p>{recommendedCrops.length ? recommendedCrops.join(', ') : getSuitableCrop()}</p>
            <button onClick={handleBackButtonClick} style={{ marginTop: '20px' }}>
                Back to Options Page
            </button>
        </div>
    );
};

export default CropSelection;