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

// update user by userId - PATCH /user
app.patch('/user/:id', async (req, res) => {
    const userId = req.params?.id;
    const updates = req.body;

    try {
        const allowedUpdates = ['userId', 'firstName', 'lastName', 'password', 'age', 'gender', 'photoUrl', 'bio', 'skills', 'city', 'state', 'country'];
        const isValidUpdate = Object.keys(updates).every((k) => allowedUpdates.includes(k));

        if (!isValidUpdate) {
            res.status(400).send('Invalid updates!');
        }
        if (updates.skills.length > 10) {
            return res.status(400).send('Cannot have more than 10 skills');
        }

        const user = await User.findByIdAndUpdate(userId, updates,
            {returnDocument: "after", runValidators: true}
        );
        
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