require('dotenv').config();
var express = require('express')
var app = express()
const port = 3000

var userRoute = require('./routes/user.route');       // define path after /users
var authRoute = require('./routes/auth.route');

var mongoose = require('mongoose');           
mongoose.connect(process.env.MONGO_URL, {          // connect MongoDB
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
var User = require('./models/user.model');

const pug = require("pug");
app.set("view engine", "pug");
app.set("views", "views");

const bodyParser = require("body-parser");              // use in Post method to get form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');          // print cookie
app.use(cookieParser("secret"));            // signed cookies (users cannot edit cookies)

app.use(express.static('public'));         // static files (img, css, js, documents...)

app.get('/', (req, res) => {          // HOME PAGE
  if (req.signedCookies.userID) {
    User.findById(req.signedCookies.userID).then(function(user) {
      res.render('index', {
        username: user.name
      })
    })
    return;
  }
  
  res.render('index', {username: ""});
})

app.use('/users', userRoute);       // PAGE RELATED TO USERS

app.use('/auth', authRoute);      // authentication (login)

app.get('*', (req, res) => {
  res.render('404.pug');
});

app.listen(port, () => {
  console.log(`Example app listeninggg at http://localhost:${port}`)
})