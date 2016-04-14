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
    speaker: String,
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
		    speaker: data[i][12],
		    language: data[i][11],
		    main_sentence: data[i][3],
		    blank_1_h1: data[i][4],
		    blank_1_h2: data[i][5],
		    blank_1_h3: data[i][6],
		    blank_1_h4: data[i][7],
		    blank_1_h5: data[i][8],
		    blank_1_h6: data[i][9],
		    blank_2_h1: data[i][13],
		    blank_2_h2: data[i][14],
		    blank_2_h3: data[i][15],
		    blank_2_h4: data[i][16],
		    blank_2_h5: data[i][17],
		    blank_2_h6: data[i][18],
		    a_font: data[i][10]
		});
		
		list.save();
		i++;
	}
	res.redirect("/");
	
};

exports.del = function(req, res) {
	i = 1;
	while (i < data.length) {
		var cond = {language: data[i][11]};
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
		var set = 1;
		var result = [];
		for (var i = 0; i < list.length;) {
			var set_tmp = [];
			while (i < list.length && list[i]._set == set) {
				list[i].question = parseInt(list[i].question) + 1;
				set_tmp.push(list[i]);
				i++;
			}
			set++;
			result.push(set_tmp);
		}
		var unit = req.query.unit;
		var tour = req.query.tour;
		var set = req.query.set - 1;
		if (req.cookies.account != null) {
			var userModel = mongoose.model('Users');
			userModel.update({username: req.cookies.account.username}, {
				$set: {current_unit: unit, current_tour: tour, current_type: 'letter_number_match'}
			}, function(err) {
				if (err) {
					console.log(err);
					return
				}
			});
			res.render("multiple_choice.jade", {title: "multiple_choice", lists: result[set]});
		}
		else
			res.redirect('/login?from=multiple_choice');
	});
};