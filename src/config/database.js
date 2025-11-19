// const { connect } = require('http2');
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://BansalGunjan_02:GunjanMongoDB@namastenode0.axwdyp2.mongodb.net/devTinderr'
    );
};

module.exports = connectDB;