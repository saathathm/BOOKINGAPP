const { Room } = require('../models/Room');
const { Hotel } = require('../models/Hotel');

//Create
const createRoom = (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    newRoom.save()
        .then((savedRoom) => {
            Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
                .then(() => {
                    res.status(200).json(savedRoom);
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch((err) => {
            next(err);
        })
}

//Update
const updateRoom = (req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((updatedRoom) => {
            res.status(200).json(updatedRoom);
        })
        .catch((err) => {
            next(err);
        })
}


//Delete
const deleteRoom = (req, res, next) => {
    const hotelId = req.params.hotelid;
    Room.findByIdAndDelete(req.params.id)
        .then(() => {
            Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
                .then(() => {
                    res.status(200).json(savedRoom);
                })
                .catch((err) => {
                    next(err);
                });
            res.status(200).json('Room Successfully Deleted');
        })
        .catch((err) => {
            next(err);
        })

}


//Get
const getRoom = (req, res, next) => {
    Room.findById(req.params.id)
        .then((room) => {
            res.status(200).json(room)
        })
        .catch((err) => {
            next(err);
        })
}


//Get All
const getRooms = (req, res, next) => {
    Room.find()
        .then((rooms) => {
            res.status(200).json(rooms);
        })
        .catch((err) => {
            next(err);
        })
}




module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms,
}