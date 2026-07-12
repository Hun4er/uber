const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First Name must be atleast 3 character'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last Name must be atleast 3 character']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be atleast 5 character long']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
})


UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
}
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;