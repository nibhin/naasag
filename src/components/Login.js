import React, { useState } from 'react';
import { auth } from '../firebase.js'; // Import the auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import './App.css'; // Import CSS for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State to hold success/error messages

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous messages
        setMessage('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successful login
                const user = userCredential.user;
                setMessage(`Login successful! Welcome ${user.email}`); // Success message
                console.log('Logged in with:', user.email);
                
                // Optionally, you can redirect the user to another page here
                // For example: history.push('/dashboard');
            })
            .catch((error) => {
                // Handle errors here
                setMessage('Invalid email or password. Please try again.'); // Error message
                console.error('Login Error:', error);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>} {/* Show message based on success or error */}
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
