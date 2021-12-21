const express = require('express');
const Class = require('../models/Room');
const User = require("../models/User");

const router = express.Router();

router.get('/', (req, res) => {
    Room.find({})
        .then(rooms => res.json(rooms));
});

router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => res.json(room))
        .catch(err => res.status(404).json(err));
});

module.exports = router;