var mongoose = require('mongoose');
var UsersModel = mongoose.model('Users');
exports.open = function(req, res) {
	if (req.cookies.account != null)
		res.render("progressmap.jade", {title: "Progress map", tour: user.current_tour, unit: user.current_unit});
	else
    	res.redirect('/login');
};