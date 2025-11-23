const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
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

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, 'Dev@Tinder$790', 
        {expiresIn: '1d'});
    return token;
};

userSchema.methods.validatePassword = async function(passwordByUser) {
    const user = this;
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordByUser, hashedPassword);
    return isPasswordValid; 
};

const User = mongoose.model('User', userSchema);
module.exports = User;
