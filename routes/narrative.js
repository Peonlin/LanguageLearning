exports.open = function(req, res) {
	// if (req.session.user)
		res.render("narrative.jade", {title: "narrative"});
	// else
		// res.redirect('/register');
};