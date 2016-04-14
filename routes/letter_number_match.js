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
    speaker_a: String,
    language_a: String,
    part_a: String,
    font_a: String,
    speaker_b: String,
    language_b: String,
    part_b: String,
    font_b: String,
    part_c: String,
    font_c: String
});

var leModel = mongoose.model('letter_number_match', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/LETTER_NUMBER_MATCH.xlsx");
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
		var list = new leModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    speaker_a: data[i][6],
		    language_a: data[i][5],
		    part_a: data[i][3],
		    font_a: data[i][4],
		    speaker_b: data[i][12],
		    language_b: data[i][11],
		    part_b: data[i][7],
		    font_b: data[i][8],
		    part_c: data[i][9],
		    font_c: data[i][10]
		});
		list.save();
		i++;
	}
	res.redirect("/");
	
};

exports.del = function(req, res) {
	var i = 1;
	while (i < data.length) {
		var cond = {language_a: data[i][5]};
		leModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	leModel.find().sort({'_id': 1}).exec(function(err, list) {
		
		var result = [], que = [];
		var a = 0, flag = 0, temp = 1, i = 0;
		while (a < list.length) {
			//一次返回一个set
			if (list[a]._set == temp) {
				//将所有set_id相同的题目数组都存在一个数组之中
				list[a].question += 1;
				que[i] = list[a];
				a++;
				i++;
			}
			else {
				i = 0;
				//把刚刚得到的题目数组存入结果数组，并重置临时数组，开始下一次循环
				result.push({
					"set_id": temp,
					"question": que
				});
				que = [];
				temp++;
			}
		}
		result.push({
			"set_id": temp,
			"question": que
		});

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
			res.render("letter_number_match.jade", {title: "LETTER_NUMBER_MATCH", lists: result[set]});
		}
		else
			res.redirect('/login?from=letter_number_match');
	});
};