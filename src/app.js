const express = require('express');
const app = express();
const connectDB = require('./config/database');
const PORT = 3000;

const User = require('./models/user');

app.post('/signup', async (req, res) => {
    // creating a new instance of user model
    const user = new User({
        firstName: 'Virat',
        lastName: 'Kohli',
        emailId: 'viratkohli123@gmail.com',
        password: '1234',
        age: 25,
        gender: 'Male',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India'
    });

    await user.save();
    res.send('User signed up successfully');
}
);

connectDB().then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}).catch((err) => {
    console.error('Database connection failed:', err);
});
