const { time } = require('console');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
        minlength: 6,
    },
    age: {
        type: Number, 
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            const allowedGenders = ['male', 'female', 'other']; 
            if (!allowedGenders.includes(value.toLowerCase())) {
                throw new Error('Gender not valid');
            }
        }   
    },
    photoUrl: {
        type: String,
        default: 'https://example.com/default-profile-pic.png'
    },
    bio: {
        type: String,
        maxlength: 500,
        default: 'hi there! I am using DevTinderr!!'
    },
    skills: {
        type: [String]
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
