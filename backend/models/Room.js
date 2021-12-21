const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    currentNo: {
        type: Number,
        default: 0,
    },
    maxNo: {
        type: Number,
        default: 3,
    },
    state: {
        type: String,
        enum: ['In desfasurare', 'Lobby', 'Finalizat'],
        default: 'Lobby',
    },
    isExtended: {
        type: Boolean,
        default: false,
    },
    players: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'User',
        default: [],
    },
    score: {
        type: [Number],
        default: [],
    },
    audienceNo: {
        type: Number,
        default: 0,
    }
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = RoomSchema;