var mongoose = require('mongoose');
var UsersModel = mongoose.model('Users');
exports.open = function(req, res) {
	UsersModel.findOne({username:req.cookies.account.username}, function (err, user) {
		res.render("progressmap.jade", {title: "Progress map", tour: user.current_tour, unit: user.current_unit});
	});
    
};