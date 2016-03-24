var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.quit = function(req, res) {
	if (req.cookies.account != null) {
		res.clearCookie("account");
		res.redirect('/');
	}
};