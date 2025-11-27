const express = require('express');
const app = express();
const connectDB = require('./config/database');
const PORT = 3000;
const cookieParser = require('cookie-parser');

// middleware to parse JSON request bodies to js objects
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);


// connecting to database and starting the server
connectDB().then(() => {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}).catch((err) => {
    console.error('Database connection failed:', err);
});
