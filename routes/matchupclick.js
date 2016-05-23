//MATCHUPCLICKS题型的导入和返回
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/learningUser");
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
//指定数据库的字段和类型
var schema = new Schema({
	_id: Number,
    _set: Number,
    comment: String,
    question: String,
    speaker_1: String,
    language_1: String,
    given: String,
    font_1: String,
    speaker_2: String,
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
//读取excel文件
var obj = xlsx.parse(name + "/app/excel/MATCHUPCLICK.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;

exports.init = function(req, res) {
	var set_tmp = 0;
	var comment_tmp = "dsa";
	//表格格式处理
	while (i < data.length) {
		if (data[i][2] == 0) {
			set_tmp = data[i][0];
			comment_tmp = data[i][1];
		}
		var _set_tmp = set_tmp;
		var comment_tmp = comment_tmp;
		//把字段和表格内容对应起来
		var list = new mucModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    speaker_1: data[i][6],
		    language_1: data[i][5],
		    given: data[i][3],
		    font_1: data[i][4],
		    sound_2: data[i][18],
		    language_2: data[i][17],
		    desired: data[i][7],
		    p1: data[i][8],
		    p2: data[i][9],
		    p3: data[i][10],
		    p4: data[i][11],
		    p5: data[i][12],
		    p6: data[i][13],
		    p7: data[i][14],
		    p8: data[i][15],
		    font_2: data[i][16]
		});
		//存储内容
		list.save();
		i++;
	}
	res.redirect("/");
	
};

exports.del = function(req, res) {
	i = 1;
	while (i < data.length) {
		var cond = {language_1: data[i][5]};
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
		var set = 1;
		var result = [];
		//将数据按照set分组
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
		//读取unit tour set值
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
			res.render("matchupclick.jade", {title: "MATCHUPCLICK", lists: result[set]});
		}
		else
			res.redirect('/login?from=matchupclick');
		//res.json(list);
	});
};