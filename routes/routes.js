//var index = require('./index');
var express = require('express');
var router = express.Router();
var user = require('./user');
var unscramble = require('./unscramble');
var aggb = require('./a_given_b_blank');
var mc = require('./multiple_choice');
var muc = require('./matchupclick');
var acbg = require('./a_cloze_b_given');
var agbc = require('./a_given_b_cloze');
var quit = require('./quit');
var find = require('./find_pwd');
var nar = require('./narrative');
var abt = require('./about');
var meth = require('./methodology');
var excel = require('./excel');
var letter = require('./letter_number_match');
var pmap = require('./progressmap');
var letsl = require('./letslearn');

router.get('/', function(req, res) {
    res.render('index.jade', { title: 'home_page'});
});

router.get('/login', function (req, res) {
	if (req.session.user)
		res.render("back_to_index.jade", {title: "test"});
	else
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

router.get('/init_acbg', acbg.init);

router.get('/a_cloze_b_given', acbg.open);

router.get('/delete_acbg', acbg.del);

router.get('/init_agbc', agbc.init);

router.get('/a_given_b_cloze', agbc.open);

router.get('/delete_agbc', agbc.del);

router.get('/quit', quit.quit);

router.get('/narrative', nar.open);

router.get('/about', abt.open);

router.get('/forget', find.open);

router.get('/methodology', meth.open);

router.post('/email', find.sendEmail);

router.post('/changePwd', find.change);

router.get('/delete_narrative', nar.del);

router.get('/init_narrative', nar.init);

router.get('/exportExcel', excel.open);

router.get('/letter_number_match', letter.open);

router.get('/init_letter', letter.init);

router.get('/delete_letter', letter.del);

router.get('/download', function(req, res) {
  res.render("download.jade",{title: 'Register'});
});

router.get('/progressmap', pmap.open);
router.get('/letslearn',letsl.open);
module.exports = router;
