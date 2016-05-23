//找回密码模块
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var db = mongoose.connection;

var user_list = mongoose.model('Users');
//设置发送邮箱信息，此处以QQ邮箱做测试
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
	//验证码通过随机数处理，获得4位验证码
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
	//封装好的发送函数
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
	//利用update函数对数据库的内容进行修改
	var cond = {username: req.body.username}, update = {$set: {password: req.body.password}}, options = {};
	user_list.update(cond, update, options, function(err, docs) {
		console.log(req.body.password);
		res.json({message: 'success'});
	});
};

exports.open = function(req, res) {
	res.render("forget.jade", {title: "Find your password"});
};