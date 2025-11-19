const express = require('express');
const app = express();
const connectDB = require('./config/database');
const PORT = 3000;

const User = require('./models/user');

// middleware to parse JSON request bodies to js objects
app.use(express.json());

// adding a new user - signup API - POST /signup
app.post('/signup', async (req, res) => {
    // creating a new instance of user model
    const user = new User(req.body);
    try {
        await user.save();
        res.send('User signed up successfully');
    } catch (err) {
        res.status(400).send('Error signing up user: ' + err.message);  
    }
});

// get user by emailId - GET /user
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({emailId: userEmail});
        if (!users) {
            res.status(404).send('User not found');
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(500).send('Error retrieving user: ' + err.message);
    }
}); 

// delete user by userId - DELETE /user
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.send('User deleted successfully');
        }
    } catch (err) {
        res.status(500).send('Error deleting user: ' + err.message);
    }
}); 

// update user by emailId - PATCH /user
app.patch('/user', async (req, res) => {
    const emailId = req.body.emailId;
    const updates = req.body;
    try {
        const user = await User.findOneAndUpdate({emailId: emailId}, updates);
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.send('User updated successfully');
        }
    } catch (err) {
        res.status(500).send('Error updating user: ' + err.message);
    }
}); 

// feed API -GET /feed - to get all users 
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send('Error retrieving feed: ' + err.message);
    }       
});


// connecting to database and starting the server
connectDB().then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}).catch((err) => {
    console.error('Database connection failed:', err);
});
