const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/user');     
const e = require('express');


authRouter.post('/signup', async (req, res) => {
    // validation of request body data 
    // encryption of password
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    // creating a new instance of user model
    const user = new User(req.body);
    try {
        await user.save();
        res.send('User signed up successfully');
    } catch (err) {
        res.status(400).send('Error signing up user: ' + err.message);  
    }
});


authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({emailId});
        if (!user) {
            throw new Error('Invalid credentials');
        }   
        const isPasswordValid = await user.validatePassword(password);
        
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie('token', token);
            res.send('Login successful');
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Error logging in: ' + err.message);
    }
}); 


authRouter.post('/logout', (req, res) => {
    res.cookie('token', null, 
        expires = new Date(Date.now()));
    res.send('Logged out successfully');
});


module.exports = authRouter;