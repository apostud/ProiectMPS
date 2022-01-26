const express = require('express');
const Room = require('../models/Room');
const User = require("../models/User");

const router = express.Router();

router.get('/', (req, res) => {
    Room.find({"type" : "public"})
        .then(rooms => res.json(rooms));
});
router.get('/private', (req, res) => {
    Room.find({"type" : "private"})
        .then(rooms => res.json(rooms));
});
router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => res.json({password: room.password }))
        .catch(err => res.status(404).json(err));
});

router.post('/', (req, res) => {
    const {name, pass, type, admin, currentNo, maxNo, isExtended, players, score, audienceNo, round} = req.body;

    const room = new Room({name, pass, type, admin, currentNo, maxNo, isExtended, players, score, audienceNo, round});

    room.save()
        .then(() => res.status(201).json('Room added!'))
        .catch(() => res.status(400).json('Couldn\'t add room'));
});

router.put('/', (req, res) => {
    const roomId = req.params.id;

    Room.findByIdAndUpdate(roomId, { $set: req.body })
        .then(() => res.json('Room updated!'))
        .catch(() => res.status(404).json('Room not found!'));
});

router.post('/room', (req, res) => {
    const roomName = req.body.name;
    const roomPass = req.body.pass;
    const query = {
        $and: [
            { name : roomName },
            { pass : roomPass }
        ]
    }
    Room.findOne({ pass : roomPass })
        .then(rooms => res.json(rooms))
        .catch((err) => res.status(404).json(err));
});

router.get('/name/:name', (req, res) => {
    Room.findOne({ name: req.params.name })
        .then(room => res.json(room))
        .catch(err => res.status(404).json(err));
});

module.exports = router;
