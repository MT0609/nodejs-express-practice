var express = require('express');
var router= express.Router();
var controller = require('../controllers/user.controller');     // define function(request, response) in controller
var validate = require('../validates/user.route');              // middleware, use for validation

router.get('/', validate.auth, controller.users);

router.get('/search', validate.auth, controller.search);

router.get('/create', validate.auth, controller.create);

router.get('/delete', validate.auth, controller.delete);                       // delete a user

router.get('/clear', (req, res) => {
    if (req.signedCookies.userID) {
        res.clearCookie('userID');
        res.redirect('/');
        return;
    }
    res.redirect('/');
})

router.get('/:id', validate.auth, controller.findByID);              // search by user ID

router.post('/create', validate.postCreate, controller.postCreate);         // if validate successful, move to post method

  
module.exports = router;