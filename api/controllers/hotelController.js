const { Hotel } = require('../models/Hotel');
const createError = require('../utils/error');

//Create
const createHotel = (req, res, next) => {
    const newHotel = new Hotel(req.body);

    newHotel.save()
        .then((savedHotel) => {
            res.status(200).json(savedHotel);
        })
        .catch((err) => {
            next(err);
        })

}


//Update
const updateHotel = (req, res, next) => {
    Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((updatedHotel) => {
            res.status(200).json(updatedHotel);
        })
        .catch((err) => {
            next(err);
        })
}


//Delete
const deleteHotel = (req, res, next) => {
    Hotel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json('Hotel Successfully Deleted');
        })
        .catch((err) => {
            next(err);
        })

}


//Get
const getHotel = (req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            res.status(200).json(hotel)
        })
        .catch((err) => {
            next(err);
        })
}


const getHotels = (req, res, next) => {
    const { min, max, limit, ...others } = req.query;

    // Add the condition for cheapestPrice
    const priceCondition = { cheapestPrice: { $gt: min | 1, $lt: max || 999 } };

    Hotel.find({ ...others, ...priceCondition }).limit(limit)
        .then((hotels) => {
            res.status(200).json(hotels);
        })
        .catch((err) => {
            next(err);
        });
};



const countByCity = (req, res, next) => {
    const cities = req.query.cities.split(",");
    Promise.all(cities.map(city => { return Hotel.countDocuments({ city: city }) }))
        .then((list) => {
            res.status(200).json(list);
        })
        .catch((err) => {
            next(err);
        })
}

const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
}





module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType,
}