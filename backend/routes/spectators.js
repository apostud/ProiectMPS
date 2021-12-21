const express = require('express');
const User = require("../models/User");
const { hashPassword, addToken, emailValidator } = require("../utils/auth");

const router = express.Router();

router.get('/', (req, res) => {
    User.find({ role: 'SPECTATOR' })
        .select('-password')
        .then(spectators => res.json(spectators))
        .catch(err => res.status(404).json(err));
})

// router.post('/', (req, res) => {
//     const { email, firstName, lastName, password} = req.body;
//     const fullName = `${lastName} ${firstName}`;

//     const player = new User({ email, fullName, password, isAdmin: false, role: 'SPECTATOR', isActive: true });

//     spectator.save()
//         .then(() => hashPassword(spectator, password, res, () => addToken(spectator, res)))
//         .catch(err => res.status(400).json(err));
// });

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .select('-password')
        .then(spectator => res.json(spectator))
        .catch(err => res.status(404).json(err));
});

module.exports = router;