const { User } = require('../models/User.js');
const bcrypt = require('bcryptjs');
const createError = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    })

    newUser.save()
        .then((registeredUser) => {
            res.status(200).json(registeredUser)
        })
        .catch((err) => {
            next(err);
        })
}

const login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) return next(createError(404, "User not found"));

            bcrypt.compare(req.body.password, user.password)
                .then((isPasswordCorrect) => {
                    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
                    
                    const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT);

                    const { isAdmin, password, ...otherDetails } = user._doc; // filter without password, isAdmin..

                    res.cookie("access_token", token, {
                        httpOnly: true,
                    }).status(200).json({...otherDetails})
                })
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    register,
    login,
}