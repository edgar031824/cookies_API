const express = require('express');
const route = express.Router();
const cookieController = require('../controllers/cookieController');
const validateLength = require('../middlewares/validateLength');

route.get('', cookieController.getCookie);
route.post('', validateLength, cookieController.saveCookie);

module.exports = route;