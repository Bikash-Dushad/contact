const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    pnumber: { type: String, required: true },
    email: { type: String, required: true },
    DOB: { type: String, required: true },
    photoPath: { type: String, required: true }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
