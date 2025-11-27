const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);

    } catch (err) {
        res.status(500).send('Error fetching profile: ' + err.message);
    }
    
});


profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error('Invalid fields in profile edit request');
        }
        const loggedInUser = req.user;
        console.log('Logged in user before edit:', loggedInUser);

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        console.log('Logged in user after edit:', loggedInUser);

        await loggedInUser.save();
        res.send('Profile edited successfully');

    } catch (err) {
        console.error(err);
        res.status(500).send('Error editing profile: ' + err.message);
    }
});



module.exports = profileRouter;