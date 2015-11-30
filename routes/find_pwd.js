var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport("smtp", {
	host: 'smtp.163.com',
	auth: {
		user: 'peonpp@163.com',
		pass: 'dirklyy131'
	}
});

exports.open = function(req, res) {
	console.log(req.body.email);
	var receiver = req.body.email;
	var mailOptions = {
		from: 'peonpp <peonpp@163.com>', //sender
		to: receiver, //receiver
		subject: 'Test',
		text: 'Test',
		html: '<b>我只是做个测试</b>'
	};

	transport.sendMail(mailOptions, function(error, info) {
		if (error)
			console.log(error);
		else {
			console.log('Message sent: ' + info.response);
			res.json({success:1});
		}
	});
	transport.close();
};

exports.test = function(req, res) {
	res.render("test.jade");
}