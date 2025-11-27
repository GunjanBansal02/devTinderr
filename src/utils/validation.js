const validator = require('validator');

const validateEditProfileData = (req) => {
    const allowedFields = ['firstName', 'lastName', 'age', 'gender', 'photoUrl', 'bio', 'skills', 'city', 'state'];
    
    const isEditAllowed = Object.keys(req.body).every(field => allowedFields.includes(field));
    return isEditAllowed; 
};

module.exports = { 
    validateEditProfileData
};