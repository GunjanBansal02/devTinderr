const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequests');
const User = require('../models/user');


requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatuses = ["ignored", "interested"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value!!!!' });
        }

        const exisingConnectionRequest = await ConnectionRequest.findOne({  
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (exisingConnectionRequest) {
            return res.status(400).json({ message: 'Connection request already exists between these users' });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: 'Recipient user not found' });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data =  await connectionRequest.save(); 
        res.json({message: 'Connection request sent successfully', data});

    } catch (err) {
        res.status(500).send('Error sending connection request: ' + err.message);
    }

    res.send(user.firstName + 'Connection request sent as interested');      
});



module.exports = requestRouter;