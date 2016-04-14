var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.connect("mongodb://localhost/learningUser");
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
var schema = new Schema({
	_id: Number,
    _set: Number,
    comment: String,
    question: Number,
    a_speaker: String,
    b_speaker: String,
    a_language: String,
    b_language: String,
    top: String,
    alternative_1: String,
    alternative_2: String,
    bottom: String,
    a_font: String,
    b_font: String
});

var agbcModel = mongoose.model('a_given_b_cloze', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/A_GIVEN_B_CLOZE.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;

exports.init = function(req, res) {
	var set_tmp = 0;
	var comment_tmp = "dsa";
	while (i < data.length) {
		if (data[i][2] == 0) {
			set_tmp = data[i][0];
			comment_tmp = data[i][1];
		}
		var _set_tmp = set_tmp;
		var comment_tmp = comment_tmp;

		var list = new agbcModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    a_speaker: data[i][6],
		    a_language: data[i][5],
		    top: data[i][3],
		    alternative_1: data[i][8],
		    alternative_2: data[i][9],
		    bottom: data[i][7],
		    a_font: data[i][4],
		    b_speaker: data[i][12],
		    b_language: data[i][11],
		    b_font: data[i][10]
		});
		list.save();
		i++;
	}
	res.redirect("/");

};

exports.del = function(req, res) {
};

exports.open = function(req, res) {
	agbcModel.find().sort({'_id': 1}).exec(function(err, list) {
		var set = 1;
		var result = [];
		for (var i = 0; i < list.length;) {
			var set_tmp = [];
			while (i < list.length && list[i]._set == set) {
				list[i].question += 1;
				set_tmp.push(list[i]);
				i++;
			}
			set++;
			result.push(set_tmp);
		}
		var unit = req.query.unit;
		var tour = req.query.tour;
		var set = req.query.set - 1;
		//需要获得应该返回的数值
		if (req.cookies.account != null) {
			var userModel = mongoose.model('Users');
			userModel.update({username: req.cookies.account.username}, {
				$set: {current_unit: unit, current_tour: tour, current_type: 'a_given_b_cloze'}
			}, function(err) {
				if (err) {
					console.log(err);
					return
				}
			});
			res.render("a_given_b_cloze.jade", {title: "A_GIVEN_B_CLOZE", lists: result[set]});
		}
		else
			res.redirect('/login');
		//res.json(list);
	});
};
