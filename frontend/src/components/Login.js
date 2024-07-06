import React, { useState } from 'react';
import "./Login.css"
import { userlogin } from '../api/api';

const LoginForm = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userlogin(username, password);
            localStorage.setItem('token', response.token);
            setAuth(true);
        } catch (error) {
            console.error("Login failed");
        }
    };

    return (

        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
