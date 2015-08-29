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
    text: String,
    start: Number,
    stop: Number
});

var AudioModel = mongoose.model('Audios', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/F1_0000.xlsx");
var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;

//console.log(parseInt(data[i][1].split(":")[3]));

exports.init = function(req, res) {
	while (data[i].length != 0) {
		var startArr = data[i][1].split(":");
		var endArr = data[i][2].split(":");
		var startTime = parseInt(startArr[0]) * 60 * 60 * 1000 + parseInt(startArr[1]) * 60 * 1000 + 
		parseInt(startArr[2]) * 1000 + parseInt(startArr[3]);
		var endTime = parseInt(endArr[0]) * 60 * 60 * 1000 + parseInt(endArr[1]) * 60 * 1000 + 
		parseInt(endArr[2]) * 1000 + parseInt(endArr[3]);
		var audio = new AudioModel({
			_id: i,
			text: data[i][0],
			start: startTime,
			stop: endTime
		});
		audio.save();
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
	while (data[i].length != 0) {
		var cond = {text: data[i][0]};
		AudioModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	AudioModel.find().sort({'_id': 1}).exec(function(err, audio) {
		res.render("unscramble.jade", {title: "unscramble", audios: audio, audio_path: audio_path});
		//res.json(audio);
	});
};