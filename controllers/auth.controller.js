var User = require('../models/user.model');

module.exports.login = (req, res) => {
    if (req.signedCookies.userID) {         // if there is cookie from user (user has logged in), no log in again
        res.redirect('/users');
        return;
    }
    res.render('auth/login');
}

module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email }, function (err, user)
    {
        // if no user found
        if (!user)
        {
            console.log("can't find");
            res.render('auth/login', {errors: ["user does not exist"], values: req.body});
            return;
        }

        // check password of that user
        if (user.password !== password)
        {
            console.log("wrong password");
            res.render('auth/login', {errors: ["wrong password"], values: req.body});
            return;
        }

        // login successful, send signed cookie to user (their id in Database) and move to users page
        res.cookie('userID', user._id, {signed: true});

        res.redirect('/users');
    });
}