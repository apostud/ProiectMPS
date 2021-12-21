const express = require('express');
const bcrypt = require('bcrypt');
const { emailValidator, addToken, hashPassword } = require('../utils/auth');
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post('/login', (req, res) => {
    if (!emailValidator(req.body.email)) {
        return res.status(400).json('Invalid email!');
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User does not exist!', source: 'email' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Your account is not activated!', source: 'activation' });
        }

        bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ message: 'Password is incorrect!', source: 'password' });
                }

                addToken(user, res);
            })
            .catch(err => res.status(500).json(err));
    });
});

router.post('/activate', (req, res) => {
    const { activationToken, password } = req.body;

    if (!activationToken) {
        return res.status(403).json('You are not authorized to activate this account!');
    }

    jwt.verify(activationToken, process.env.EMAIL_VALIDATION_KEY, (err) => {
        if (err) {
            return res.status(401).json('The activation token is invalid or has expired!');
        }

        User.findOne({ activationToken })
            .then(user => {
                if (!user || user.isActive) {
                    return res.status(400).json('This account is active or the token is invalid!');
                }

                user.activationToken = '';
                user.isActive = true;
                hashPassword(user, password, res, () => res.json('Account activated!'));
            });
    });
});

module.exports = router;