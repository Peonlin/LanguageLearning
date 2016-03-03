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

var acbgModel = mongoose.model('a_cloze_b_given', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/A_CLOZE_B_GIVEN.xlsx");
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
		
		var list = new acbgModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    a_speaker: data[i][8],
		    a_language: data[i][7],
		    top: data[i][3],
		    alternative_1: data[i][4],
		    alternative_2: data[i][5],
		    bottom: data[i][9],
		    a_font: data[i][6],
		    b_sound: data[i][12],
		    b_speaker: data[i][11],
		    b_font: data[i][10] 
		});
		list.save();
		i++;
	}
	
	res.redirect("/");
	
};

exports.del = function(req, res) {
	i = 1;
	while (i < data.length) {
		var cond = {a_language: data[i][7]};
		acbgModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	acbgModel.find().sort({'_id': 1}).exec(function(err, list) {
		if (req.cookies.account != null)
			res.render("a_cloze_b_given.jade", {title: "A_CLOZE_B_GIVEN", lists: list});
		else
			res.redirect('/login');
		//res.json(list);
	});
};