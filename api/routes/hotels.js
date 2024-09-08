const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { verifyAdmin } = require('../utils/verifyToken');

// create
router.post('/', verifyAdmin, hotelController.createHotel);

// update
router.put('/:id', verifyAdmin, hotelController.updateHotel);

// delete
router.delete('/:id', verifyAdmin, hotelController.deleteHotel);

// get
router.get('/find/:id', hotelController.getHotel);

// getAll
router.get('/', hotelController.getHotels)


router.get('/countByCity', hotelController.countByCity)

router.get('/countByType', hotelController.countByType)



module.exports = router;