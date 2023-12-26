const express = require('express');
const account = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const verifyToken = require('../middleware/verifyToken');


account.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Fields are missing' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });

        const savedUser = await newUser.save();

        // Generate a JWT token with a payload containing non-sensitive user information
        const jwtPayload = {
            userId: savedUser._id,
            email: savedUser.email,
            name: savedUser.name,
            // Add any other non-sensitive information here
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_PRIVATE, { expiresIn: '1h' });

        res.status(201).json({ message: 'Registration successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

account.post('/login', async (req,res) => {
    try{
        const { email, password } = req.body;

        if(!email || password) {
            return res.status(404).json({error: 'Fields are missing'})
        }

        const foundUser = await User.findOne({email: email})

        if(!foundUser) {
            return res.status(404).json({error: `User ${email} was not found`})
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password)

        if(!passwordMatch) {
            return res.status(404).json({ error: 'Password is incorrect'})
        }

        const tokenPayload = {
            email: foundUser.email,
            name: foundUser.name
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_PRIVATE, { expiresIn: '24h' });

        res.json({message: 'Login Successfully', token: token, Payload: tokenPayload})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });        
    }
})

account.post('/dashboard', verifyToken, (req, res) => {
    try {
        // Access the decoded data from the JWT
        const { email, name } = req.user;
        console.table({
            email: email,
            name: name
        })
        
        // Your login logic goes here
        // For example, you can send a response with the email and name
        res.status(200).json({ message: 'Login successful', email, name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = account;
