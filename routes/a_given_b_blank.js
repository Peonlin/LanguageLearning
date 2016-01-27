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
    a_sound: String,
    b_sound: String,
    a_language: String,
    b_language: String,
    top: String,
    bottom: String,
    bottom_1: String,
    bottom_2: String,
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

console.log(data.length);

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
		var a_sound_tmp = data[i][3];
		var a_language_tmp = data[i][4];
		var top_tmp = data[i][5];
		var a_font_tmp = data[i][6];
		var b_sound_tmp = data[i][7];
		var b_language_tmp = data[i][8];
		var bottom_tmp = data[i][9];
		var bottom_1_tmp = data[i][10];
		var bottom_2_tmp = data[i][11];
		var b_font_tmp = data[i][12];
		var list = new aggbModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: question_tmp,
		    a_sound: a_sound_tmp,
		    a_language: a_language_tmp,
		    top: top_tmp,
		    bottom: bottom_tmp,
		    bottom_1: bottom_1_tmp,
		    bottom_2: bottom_2_tmp,
		    a_font: a_font_tmp,
		    b_sound: b_sound_tmp,
		    b_language: b_language_tmp,
		    b_font: b_font_tmp 
		});
		list.save();
		//console.log(i);
		i++;
	}
	/*while (data[i].length != 0) {
		var cond = {text: data[i][0]};
		AudioModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}*/
	res.redirect("/");
	
};

exports.del = function(req, res) {
	while (i < data.length) {
		var cond = {a_language: data[i][4]};
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
		if (req.session.user)
			res.render("a_given_b_blank.jade", {title: "A_GIVEN_B_BLANK", lists: list});
		else
			// res.render("a_given_b_blank.jade", {title: "A_GIVEN_B_BLANK", lists: list});
			res.redirect('/login');
		//res.json(list);
	});
};