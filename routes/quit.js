var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.quit = function(req, res) {
	if (req.session.user) {
		req.session.user = undefined;
		res.redirect('/');
	}
};