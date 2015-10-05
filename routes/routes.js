//var index = require('./index');
var express = require('express');
var router = express.Router();
var user = require('./user');
var unscramble = require('./unscramble');
var aggb = require('./a_given_b_blank');
var mc = require('./multiple_choice');
var muc = require('./matchupclick');
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

router.get('/init', unscramble.init);

router.get('/delete', unscramble.del);

router.get('/init_aggb', aggb.init);

router.get('/a_given_b_blank', aggb.open);

router.get('/delete_aggb', aggb.del);

router.get('/init_mc', mc.init);

router.get('/delete_mc', mc.del);

router.get('/multiple_choice', mc.open);

router.get('/init_muc', muc.init);

router.get('/delete_muc', muc.del);

router.get('/matchupclick', muc.open);

module.exports = router;
