const express = require('express');
const roomController = require('../controllers/roomController');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

// create
router.post('/:hotelid', verifyAdmin, roomController.createRoom);

// update
router.put('/:id', verifyAdmin, roomController.updateRoom);

// delete
router.delete('/:id/:hotelid', verifyAdmin, roomController.deleteRoom);

// get
router.get('/:id', roomController.getRoom);

// getAll
router.get('/', roomController.getRooms)


module.exports = router;