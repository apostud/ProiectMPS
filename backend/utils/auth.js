const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const User = require('../models/User');
const nodemailer = require("nodemailer");

require('dotenv').config({ path: __dirname + '/../.env' });

/**
 * Generate a jwt token and attach it to a cookie, along with other user data; send the cookie to the client
 */
const addToken = (user, res) => {
    jwt.sign({ id: user._id }, process.env.JWT_KEY, (err, token) => {
        if (err) {
            return res.status(404).json(err);
        }

        res.cookie('t', token);

        return res.json({
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                isAdmin: user.isAdmin,
            },
            token,
        });
    });

    return {};
};

/**
 * Hash password and save it to the student document; send user data as response to the client
 */
const hashPassword = (user, password, res, next) => {
    bcrypt.hash(password, 10)
        .then(hash => {
            user.password = hash;
            user.save().then(() => next())
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).json({ message: err }));
};

/**
 * Generate a token by encrypting the user email, then build and send an activation email
 */
const sendActivationEmail = (user, res) => {
    const token = jwt.sign({ email: user.email }, process.env.EMAIL_VALIDATION_KEY);

    const data = {
        from: 'QResent <noreply@qresent.org>',
        to: user.email,
        subject: 'Activate Your QResent Account',
        html: `
            <h3>Please click on the following link to activate your QResent account:</h3>
            <a href="${process.env.CLIENT_URL}/activate/${token}">activate account</a>
        `,
    };

    user.activationToken = token;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "qresent.upb@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    user.save()
        .then(() => {
            transporter.sendMail(data)
                .then(() => res.json('An activation link has been sent to your email address!'))
                .catch(() => {
                    User.deleteOne({ email: user.email })
                        .then(() => res.status(400).json('Email address is invalid!'))
                        .catch(err => res.status(500).json(err));
                });
        });
};

const passwordValidator = (password) => {
    const regex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|' +
        '((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    return (regex.test(password));
};

const emailValidator = (email) => {
    return validator.validate(email);
};

const nameValidator = (fullName) => {
    const regex = new RegExp('^[a-zA-Z -]{3,30}$');
    return regex.test(fullName);
};

const credentialsValidator = ({ email, fullName, password }) => {
    if (!emailValidator(email)) {
        throw new Error('Invalid email!');
    }

    if (!passwordValidator(password)) {
        throw new Error('The password must be at least 6 characters long and contain a combination of letters, ' +
            'numbers and special characters!');
    }

    if (!nameValidator(fullName)) {
        throw new Error('The name should only contain letters, spaces and dashes.');
    }
};

const generateTokenAttendance = (attendance, res) => {
    const payload = {
        attendance_date: attendance.date,
        classID: attendance.classID
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 120 });

    return res.json(`${process.env.CLIENT_URL}/attend/${token}` );
};

module.exports = {
    sendActivationEmail,
    hashPassword,
    credentialsValidator,
    emailValidator,
    addToken,
    generateTokenAttendance
};

