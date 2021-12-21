const express = require('express');
const User = require("../models/User");
const { hashPassword, addToken, emailValidator } = require("../utils/auth");

const router = express.Router();

router.get('/', (req, res) => {
    User.find({ role: 'PLAYER' })
        .select('-password')
        .then(players => res.json(players))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const { email, firstName, lastName, password} = req.body;
    const fullName = `${lastName} ${firstName}`;

    const player = new User({ email, fullName, password, isAdmin: false, role: 'PLAYER', isActive: true });

    try {
        emailValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    player.save()
        .then(() => hashPassword(player, password, res, () => addToken(player, res)))
        .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .select('-password')
        .then(player => res.json(player))
        .catch(err => res.status(404).json(err));
});

module.exports = router;