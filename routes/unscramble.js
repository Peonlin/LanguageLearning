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
    sound_1: String,
    language_1: String,
    top: String,
    bottom: String,
    font_1: String,
    sound_2: String,
    language_2: String,
    U1: String,
    U2: String,
    U3: String,
    U4: String,
    U5: String,
    U6: String,
    U7: String,
    U8: String,
    U9: String,
    font_2: String 
});

var USBModel = mongoose.model('unscramble', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/UNSCRAMBLE.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;

console.log(data.length);

exports.init = function(req, res) {
	while (i < data.length) {
		var _set = data[i][0];
		var comment = data[i][1];
		var question = data[i][2];
		var sound_1 = data[i][3];
		var language_1 = data[i][4];
		var top = data[i][5];
		var bottom = data[i][6];
		var font_1 = data[i][7];
		var sound_2 = data[i][8];
		var language_2 = data[i][9];
		var U1 = data[i][10];
		var U2 = data[i][11];
		var U3
		var usb = new USBModel({
			_id: i,
		    _set: data[i][0],
		    comment: data[i][1],
		    question: data[i][2],
		    sound_1: data[i][3],
		    language_1: data[i][4],
		    top: data[i][5],
		    bottom: data[i][6],
		    font_1: data[i][7],
		    sound_2: data[i][8],
		    language_2: data[i][9],
		    U1: data[i][10],
		    U2: data[i][11],
		    U3: data[i][12],
		    U4: data[i][13],
		    U5: data[i][14],
		    U6: data[i][15],
		    U7: data[i][16],
		    U8: data[i][17],
		    U9: data[i][18],
		    font_2: data[i][19] 
		});
		usb.save();
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
		var cond = {U1: data[i][10]};
		USBModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	USBModel.find().sort({'_id': 1}).exec(function(err, usb) {
		res.render("unscramble.jade", {title: "unscramble", audios: usb});
		//res.json(audio);
	});
};