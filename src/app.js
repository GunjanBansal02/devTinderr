const express = require('express');
const app = express();
const PORT = 3000;

// const adminAuth = require('./middlewares/auth'); 

// app.use('/admin', adminAuth.adminAuth);

app.get('/getUserData', (req, res) => {
    console.log("Get User Data endpoint hit");
    throw new Error('Simulated server error');
    res.send('User data accessed successfully');
});

app.use('/', (err, req, res, next) => {
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});