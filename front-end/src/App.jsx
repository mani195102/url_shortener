import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Auth from "./components/Auth";
import ShortenForm from "./components/ShortenForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { AppBar, Tabs, Tab } from '@mui/material';

const App = () => (
    <div style={{ zIndex: '1', position: 'relative' }}>
        <Router>
            <AppBar position="static">
                <Tabs>
                    <Tab style={{ color:'#fff'}} label="Home" component={Link} to="/" />
                    <Tab style={{ color:'#fff'}} label="Register" component={Link} to="/register" />
                    <Tab style={{ color:'#fff'}} label="Shorten URL" component={Link} to="/shortenForm" />
                </Tabs>
            </AppBar>
            <Routes>
                <Route path="/" element={<Auth type="login" />} />
                <Route path="/register" element={<Auth type="register" />} />
                <Route path="/shortenForm" element={<ShortenForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    </div>
);

export default App;
