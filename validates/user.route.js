var User = require('../models/user.model');

module.exports.postCreate = (req, res, next) => {
    let errors = [];
    if (!req.body.name) 
        errors.push('Name is required');
    if (!req.body.email)
        errors.push('Email is required');
    if (!req.body.phone)
        errors.push('Phone is required');
    if (!req.body.password)
        errors.push('Password is required');

    if (errors.length)
    {
        res.render('user/create', {errors: errors});
        return;
    }
    
    next();
}

module.exports.auth = (req, res, next) => {
    if (!req.signedCookies.userID) {            // if no cookies found
        res.redirect('/auth/login');
        return;
    }
    
    User.findById(req.signedCookies.userID).then(function(user) {
        if (!user) {
            res.redirect('/auth/login');
            return;
        }
        res.locals.username = user.name;
        next();
    })
}