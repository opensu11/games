const express = require('express');

const router = express.Router();

const { mainPage } = require('../controllers/client_controller');

router.get('/', mainPage);

module.exports = router;