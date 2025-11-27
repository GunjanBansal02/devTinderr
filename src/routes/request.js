const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

requestRouter.post('sendConnectionRequest', userAuth, async (req, res) => {
    comnstuser = req.user;
    console.log('User sending connection request:', user);
    res.send('Connection request sent successfully by' + user.firstName);       
});



module.exports = requestRouter;