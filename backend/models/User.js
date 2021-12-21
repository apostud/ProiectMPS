const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: process.env.DEFAULT_PASSWORD,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'PLAYER', 'SPECTATOR'],
        default: 'STUDENT',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;