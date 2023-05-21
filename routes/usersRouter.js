const express = require('express');
const { getUsersController } = require('../controllers/getUsersController');
const { updateUserController } = require('../controllers/updateUserController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:page', authMiddleware, getUsersController);

router.patch('/update/:userId', authMiddleware, updateUserController);

module.exports = router;
