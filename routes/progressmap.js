var mongoose = require('mongoose');
var UsersModel = mongoose.model('Users');
exports.open = function(req, res) {
	if (req.cookies.account != null) {
		UsersModel.findOne({username: req.cookies.account.username}, function(err, user) {
			console.log(user.current_tour + '\n' + user.current_unit);
			res.render("progressmap.jade", {title: "Progress map", tour: user.current_tour, unit: user.current_unit});
		});
	}
	else
    	res.redirect('/login');
};