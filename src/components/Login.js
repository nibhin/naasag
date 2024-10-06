// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase.js'; // Ensure this path is correct
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the signIn function
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Import CSS for styling

const Login = () => {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Use the imported signInWithEmailAndPassword function
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            navigate('/map'); // Redirect to MapPage
        } catch (error) {
            console.error('Login failed:', error.message);
            alert('Login failed: ' + error.message); // Display error message
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
