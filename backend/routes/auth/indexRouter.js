const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({ message: "User already exists" }); // Use return to prevent further execution
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ username, email, password: hashedPassword });
        await user.save();

        return res.status(200).send({ message: "User created successfully" }); // Use return to prevent further execution
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong" }); // Use return to prevent further execution
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header("auth-token", token).status(200).send({ message: "Login successful"});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Something went wrong" });
    }
});

module.exports = router;
