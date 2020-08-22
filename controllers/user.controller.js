var User = require('../models/user.model');

module.exports.users = (req, res) => {
  console.log("cookie: ", req.signedCookies);
  User.find().then(function(users) {
    
    //let username = await users.findById(req.signedCookies.userID).exec();
    res.render('user/users', {users: users, username: res.locals.username});
  })
}

module.exports.search = (req, res) => {
    var q = req.query.q;
    User.find().then(function(users) {
      res.render('user/users', {
        users: users.filter((user) => user.name.toLowerCase().indexOf(q) != -1)
      })
    })
}

module.exports.create = (req, res) => {
    res.render('user/create');
}
 
module.exports.findByID = (req, res) => {
  let id = req.params.id;

  User.findById(id, function(err, user) {
    if (!user)
    {
      res.render('user/info', { user: "" })
      return;
    }
    res.render('user/info', {
      user: user
    })
  })
}

module.exports.postCreate = (req, res) => {
  console.log(req.body, req.body.name);
  User.create(req.body);
  res.redirect('/users');
}

module.exports.delete = (req, res) => {
  let id = req.query.user;

  if (id === req.signedCookies.userID) {          // if the user is signing in, then he cannot delete himself
    res.redirect('/users');
    return;
  }
  
  User.deleteOne({ _id: id }, function (err) {
    if (err)
    {
      res.redirect('/users');
      console.log("cannot delete");
      return;
    }
  });

  res.redirect('/users');
}