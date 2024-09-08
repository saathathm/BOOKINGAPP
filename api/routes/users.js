const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken')

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send('Hello user, You are logged in');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('Hello User, You are logged in and you can delete your account');
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Hello Admin, You are logged in and you can delete all accounts');
// });

// update
router.put('/:id', verifyUser, userController.updateUser);

// delete
router.delete('/:id', verifyUser, userController.deleteUser);

// get
router.get('/:id', verifyUser, userController.getUser);

// getAll
router.get('/', verifyAdmin, userController.getUsers)


module.exports = router;