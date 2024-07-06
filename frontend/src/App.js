import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginForm from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';
import LoginForm from './components/Login';

const App = () => {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setAuth(true);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={!isAuth ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={!isAuth ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={isAuth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/" />} />
                <Route path="/login" element={!isAuth ? <LoginForm setAuth={setAuth}/> : <Navigate to="/dashboard" /> } />
            </Routes>
        </Router>
    );
};

export default App;
