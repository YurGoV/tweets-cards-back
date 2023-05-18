const express = require('express');
const { getUsersController } = require('../controllers/getUsersController');
// const { updateValidateMiddleware } = require('../middleware/followingValidateMiddleware');

const router = express.Router();

// router.patch('/', updateValidateMiddleware);

router.get('/', getUsersController);

module.exports = router;
