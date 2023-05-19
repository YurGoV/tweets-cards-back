const express = require('express');
const { getUsersController } = require('../controllers/getUsersController');
// const { updateValidateMiddleware } = require('../middleware/followingValidateMiddleware');

const router = express.Router();

// router.patch('/', updateValidateMiddleware);

router.get('/:page', getUsersController);

module.exports = router;
