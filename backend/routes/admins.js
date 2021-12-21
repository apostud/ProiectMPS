const express = require('express');
const User = require("../models/User");
const { hashPassword, addToken, emailValidator } = require("../utils/auth");

const router = express.Router();

router.get('/', (req, res) => {
    User.find({ role: 'ADMIN' })
        .select('-password')
        .then(admins => res.json(admins))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const { email, firstName, lastName, password} = req.body;
    const fullName = `${lastName} ${firstName}`;

    const admin = new User({ email, fullName, password, isAdmin: true, role: 'ADMIN', isActive: true });

    try {
        emailValidator(req.body);
    } catch (err) {
        return res.status(400).json(err.message);
    }

    admin.save()
        .then(() => hashPassword(admin, password, res, () => addToken(admin, res)))
        .catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .select('-password')
        .then(admin => res.json(admin))
        .catch(err => res.status(404).json(err));
});

module.exports = router;