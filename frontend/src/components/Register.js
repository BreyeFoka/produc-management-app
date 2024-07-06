import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { Link } from 'react-router-dom';

const Register = ({ setAuth }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({
                first_name: firstName,
                last_name: lastName,
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            setAuth(true);
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Signup</button>
            <p>Already a user? <Link to="/login">Login</Link></p>
        </form>
    );
};

export default Register;
