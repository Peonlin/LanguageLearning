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
    sound: String,
    language: String,
    main_sentence: String,
    blank_1_h1: String,
    blank_1_h2: String,
    blank_1_h3: String,
    blank_1_h4: String,
    blank_1_h5: String,
    blank_1_h6: String,
    blank_2_h1: String,
    blank_2_h2: String,
    blank_2_h3: String,
    blank_2_h4: String,
    blank_2_h5: String,
    blank_2_h6: String,
    a_font: String
});

var mcModel = mongoose.model('multiple_choice', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/MULTIPLE_CHOICE.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;


exports.init = function(req, res) {
	var set_tmp = 0;
	var comment_tmp = "dsa";
	while (i < data.length && data[i][2] != undefined) {
		if (data[i][2] == 0) {
			set_tmp = data[i][0];
			comment_tmp = data[i][1];
		}

		var _set_tmp = set_tmp;
		var comment_tmp = comment_tmp;
		var list = new mcModel({
			_id: i,
    		_set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    sound: data[i][3],
		    language: data[i][4],
		    main_sentence: data[i][5],
		    blank_1_h1: data[i][6],
		    blank_1_h2: data[i][7],
		    blank_1_h3: data[i][8],
		    blank_1_h4: data[i][9],
		    blank_1_h5: data[i][10],
		    blank_1_h6: data[i][11],
		    blank_2_h1: data[i][12],
		    blank_2_h2: data[i][13],
		    blank_2_h3: data[i][13],
		    blank_2_h4: data[i][14],
		    blank_2_h5: data[i][15],
		    blank_2_h6: data[i][16],
		    a_font: data[i][17]
		});
		
		list.save();
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
		var cond = {language: data[i][4]};
		mcModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	mcModel.find().sort({'_id': 1}).exec(function(err, list) {
		res.render("multiple_choice.jade", {title: "multiple_choice", lists: list});
		//res.json(list);
	});
};