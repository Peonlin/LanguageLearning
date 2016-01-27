var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var db = mongoose.connection;

var user_list = mongoose.model('Users');

var transport = nodemailer.createTransport("smtp", {
	host: 'smtp.qq.com',
	auth: {
		user: '417275032@qq.com',
		pass: 'tuoznwdyifnfcbaj'
	}
});

var valid_number;

exports.sendEmail = function(req, res) {
	console.log(req.body.email);
	var receiver = req.body.email;
	valid_number = Math.floor(Math.random()*10000+1);
	if (valid_number < 1000) {
		valid_number += 5000;
	}
	var mailOptions = {
		from: 'peonpp <417275032@qq.com>', //sender
		to: receiver, //receiver
		subject: '这是一封来自AugenBlick的信息！',
		text: 'Test',
		html: '<b>你的验证码是：' + valid_number + '</b>'
	};

	transport.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			res.json({message: error});
		}
		else {
			console.log('Message sent: ' + info.response);
			res.json({message: 'success', valid: valid_number});
		}
	});
	transport.close();
};

exports.change = function(req, res) {
	console.log(req.body.username);
	var cond = {username: req.body.username}, update = {$set: {password: req.body.password}}, options = {};
	user_list.update(cond, update, options, function(err, docs) {
		console.log(req.body.password);
		res.json({message: 'success'});
	});
};

exports.open = function(req, res) {
	res.render("forget.jade", {title: "Find your password"});
};