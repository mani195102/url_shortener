const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../model/User');
const router = express.Router();
require("dotenv").config();


// Register
router.post('/register', async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            email,
            password,
            firstname,
            lastname
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => { // Increased expiration time
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'srimani199300@gmail.com',
                pass: 'emglcnnqtucgqifz',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: 'srimani199300@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Click on this link to reset your password: http://localhost:5173/reset_password/${user.id}/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ msg: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ msg: 'Password reset link sent to your email' });
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Reset Password
router.get('/reset_password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user ID matches the one in the token payload
        if (decoded.userId !== id) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        res.status(200).json({ token });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ msg: 'Password reset token expired' });
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/reset_password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if the user ID matches the one in the token payload
        if (decoded.userId !== id) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        // Update the user's password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ msg: 'Password reset token expired' });
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;