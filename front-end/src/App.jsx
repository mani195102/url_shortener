import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Auth from "./components/Auth";
import ShortenForm from "./components/ShortenForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { AppBar, Tabs, Tab } from '@mui/material';

const App = () => {
    const location = useLocation();
    const [value, setValue] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Set active tab based on current location
        if (location.pathname === '/') {
            setValue(0);
        } else if (location.pathname === '/register') {
            setValue(1);
        } else if (location.pathname === '/shortenForm') {
            setValue(2);
        } else if (location.pathname === '/logout') {
            setValue(3);
        }
    }, [location.pathname]);

    useEffect(() => {
        // Check if user is logged in (e.g., check token existence)
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update isLoggedIn state based on token existence
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ zIndex: '1', position: 'relative' }}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab style={{ color: '#fff' }} label="Home" component={Link} to="/" />
                    {!isLoggedIn && (
                        <Tab style={{ color: '#fff' }} label="Login" component={Link} to="/" />
                    )}
                    {isLoggedIn && (
                        <Tab style={{ color: '#fff' }} label="Logout" component={Link} to="/logout" />
                    )}
                    <Tab style={{ color: '#fff' }} label="Register" component={Link} to="/register" />
                    {isLoggedIn && (
                        <Tab style={{ color: '#fff' }} label="Shorten URL" component={Link} to="/shortenForm" />
                    )}
                </Tabs>
            </AppBar>
            <Routes>
                <Route path="/" element={<Auth type="login" />} />
                <Route path="/register" element={<Auth type="register" />} />
                <Route path="/shortenForm" element={<ShortenForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
                <Route path="/logout" element={<LogoutComponent />} />
            </Routes>
        </div>
    );
};

const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            localStorage.removeItem('token'); // Remove token from localStorage or session storage
            navigate('/'); // Navigate to home page
        };

        handleLogout(); // Call handleLogout on component mount
    }, [navigate]); // Empty dependency array ensures it runs only once on mount

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;
