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
    question: String,
    sound_1: String,
    language_1: String,
    given: String,
    font_1: String,
    sound_2: String,
    language_2: String,
    desired: String,
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
    p6: String,
    p7: String,
    p8: String,
    font_2: String,
});

var mucModel = mongoose.model('matchupclick', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/MATCHUPCLICK.xlsx");
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
		var list = new mucModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    sound_1: data[i][3],
		    language_1: data[i][4],
		    given: data[i][5],
		    font_1: data[i][6],
		    sound_2: data[i][7],
		    language_2: data[i][8],
		    desired: data[i][9],
		    p1: data[i][10],
		    p2: data[i][11],
		    p3: data[i][12],
		    p4: data[i][13],
		    p5: data[i][14],
		    p6: data[i][15],
		    p7: data[i][16],
		    p8: data[i][17],
		    font_2: data[i][18]
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
		var cond = {language_1: data[i][4]};
		mucModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	mucModel.find().sort({'_id': 1}).exec(function(err, list) {
		if (req.session.user)
			res.render("matchupclick.jade", {title: "MATCHUPCLICK", lists: list});
		else
			res.redirect('/login');
		//res.json(list);
	});
};