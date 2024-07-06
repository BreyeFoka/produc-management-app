import React, { useState } from 'react';
import { userRegister } from '../api/api';
import { Link } from 'react-router-dom';
import "./register.css"

const Register = ({ setAuth }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userRegister({
                firstname: firstName,
                lastname: lastName,
                username,
                password
            });
            localStorage.setItem('token', response.token);
            setAuth(true);
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
        <h2>Signup</h2>
        <div className="input-container">
            <label>First Name:</label>
            <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            />
        </div>
        <div className="input-container">
            <label>Last Name:</label>
            <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
            />
        </div>
        <div className="input-container">
            <label>Username:</label>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
        </div>
        <div className="input-container">
            <label>Password:</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
        </div>
        <button type="submit">Signup</button>
        <p>Already a user? <Link to="/login">Login</Link></p>
    </form>
    );
};

export default Register;
