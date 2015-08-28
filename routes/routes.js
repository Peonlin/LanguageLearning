//var index = require('./index');
var express = require('express');
var router = express.Router();
var user = require('./user');
var unscramble = require('./unscramble');
router.get('/', function(req, res) {
    res.render('index.jade', { title: 'home_page'});
});

router.get('/login', function (req, res) {
  res.render("login.jade",{title: "login"});
});

router.get('/register', function(req, res) {
  res.render("register.jade",{title: 'Register'});
});

router.post("/register", user.create);

router.post("/login", user.login);

router.get('/unscramble', unscramble.open);

module.exports = router;
