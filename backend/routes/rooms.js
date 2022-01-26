const express = require('express');
const Room = require('../models/Room');
const User = require("../models/User");

const router = express.Router();

router.get('/', (req, res) => {
    Room.find({"type" : "public"})
        .then(rooms => res.json(rooms));
});

router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => res.json(room))
        .catch(err => res.status(404).json(err));
});

router.post('/', (req, res) => {
    const {name, type, admin, currentNo, maxNo, state, isExtended, players, score, audienceNo} = req.body;

    const room = new Room({name, type, admin, currentNo, maxNo, state, isExtended, players, score, audienceNo});

    room.save()
        .then(() => res.status(201).json('Room added!'))
        .catch(() => res.status(400).json('Couldn\'t add room'));
});

router.put('/:id', (req, res) => {
    const roomId = req.params.id;

    Room.findByIdAndUpdate(roomId, { $set: req.body })
        .then(() => res.json('Room updated!'))
        .catch(() => res.status(404).json('Room not found!'));
});

module.exports = router;