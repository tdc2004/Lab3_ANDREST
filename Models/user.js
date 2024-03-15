const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    passWord: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    }
})
const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;