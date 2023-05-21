const express = require('express');
const { getUsersController } = require('../controllers/getUsersController');
const { updateUserController } = require('../controllers/updateUserController');
const { authMiddleware } = require('../middleware/authMiddlare');
// const { updateValidateMiddleware } = require('../middleware/followingValidateMiddleware');

const router = express.Router();

router.get('/:page', authMiddleware, getUsersController);
// router.get('/:page', getUsersController);
router.patch('/update/:userId', authMiddleware, updateUserController);
// router.patch('/update/:userId', updateUserController);

module.exports = router;
