const express = require('express');
const { getUsersController } = require('../controllers/getUsersController');
const { updateUserController } = require('../controllers/updateUserController');
// const { updateValidateMiddleware } = require('../middleware/followingValidateMiddleware');

const router = express.Router();

// router.patch('/', updateValidateMiddleware);

router.get('/:page', getUsersController);

router.patch('/update/:userId', updateUserController);

module.exports = router;
