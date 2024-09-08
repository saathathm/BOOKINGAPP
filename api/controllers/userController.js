const { User } = require('../models/User');
const createError = require('../utils/error');

//Create
const createUser = (req, res, next) => {
    const newUser = new User(req.body);

    newUser.save()
        .then((savedUser) => {
            res.status(200).json(savedUser);
        })
        .catch((err) => {
            next(err);
        })

}


//Update
const updateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            next(err);
        })
}


//Delete
const deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json('User Successfully Deleted');
        })
        .catch((err) => {
            next(err);
        })

}


//Get
const getUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            next(err);
        })
}


//Get All
const getUsers = (req, res, next) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            next(err);            
        })
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
}