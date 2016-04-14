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
    bottom: String,
    bottom_1: String,
    bottom_2: String,
    bottom_3: String,
    a_font: String,
    b_font: String
});

var aggbModel = mongoose.model('a_given_b_blank', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/A_GIVEN_B_BLANK.xlsx");
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
		var question_tmp = data[i][2];
		var a_speaker_tmp = data[i][6];
		var a_language_tmp = data[i][5];
		var top_tmp = data[i][3];
		var a_font_tmp = data[i][4];
		var b_font_tmp = data[i][10];
		var b_speaker_tmp = data[i][12];
		var b_language_tmp = data[i][11];
		var bottom_tmp = data[i][7];
		var bottom_1_tmp = data[i][8];
		var bottom_2_tmp = data[i][9];

		var b_font_tmp = data[i][12];
		var list = new aggbModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: question_tmp,
		    a_speaker: a_speaker_tmp,
		    a_language: a_language_tmp,
		    top: top_tmp,
		    bottom: bottom_tmp,
		    bottom_1: bottom_1_tmp,
		    bottom_2: bottom_2_tmp,
		    a_font: a_font_tmp,
		    b_speaker: b_speaker_tmp,
		    b_language: b_language_tmp,
		    b_font: b_font_tmp,
		    bottom_3: data[i][10]
		});
		list.save();
		//console.log(i);
		i++;
	}
	res.redirect("/");
	
};

exports.del = function(req, res) {
	i = 1;
	while (i < data.length) {
		var cond = {a_language: data[i][5]};
		aggbModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	aggbModel.find().sort({'_id': 1}).exec(function(err, list) {
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
			// var userModel = mongoose.model('Users');
			// userModel.update({username: req.cookies.account.username}, {
			// 	$set: {current_unit: unit, current_tour: tour, current_type: 'a_given_b_blank'}
			// }, function(err) {
			// 	if (err) {
			// 		console.log(err);
			// 		return
			// 	}
			// });
			res.render("a_given_b_blank.jade", {title: "A_GIVEN_B_BLANK", lists: list});
		}
		else
			res.redirect('/login');
	});
};