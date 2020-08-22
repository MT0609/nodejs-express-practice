var express = require('express');
var router= express.Router();
var controller = require('../controllers/auth.controller');     // define function(request, response) in controller

router.get('/login', controller.login);         // get login form

router.post('/login', controller.postLogin);    // submit form
  
module.exports = router;