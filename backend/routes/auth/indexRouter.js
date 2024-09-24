const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../../middlewares/authentication-middleware');

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        console.error('Error in user registration:', err);
        return res.status(500).send({ message: "Internal server error", error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header("auth-token", token).status(200).send({ message: "Login successful", token });
    } catch (err) {
        console.error('Error in user login:', err);
        return res.status(500).send({ message: "Internal server error", error: err.message });
    }
});

router.get('/logout', authMiddleware, (req, res) => {
    try {
        // Since we're using JWT, we don't need to do anything server-side for logout
        // The client should remove the token from storage
        res.status(200).send({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Error in user logout:', err);
        return res.status(500).send({ message: "Internal server error", error: err.message });
    }
});

module.exports = router;
