const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        // read the token from req cookies
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Token not found');
        }
        
        // validate the token
        const decodedObj = jwt.verify(token, 'Dev@Tinder$790');
        
        // find the user from the database
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error('ERROR: User not found');
        }  
        req.user = user; // attaching user details to req object 
        next();
    
    } catch (err) {
        res.status(401).send('Unauthorized: ' + err.message);
    }
};

module.exports = {
    userAuth
};