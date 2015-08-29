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
    start: String,
    stop: String
});

var AudioModel = mongoose.model('Audios', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/F1_0000.xlsx");
var data = obj[0].data;
var i = 1;

//console.log(name);

exports.init = function(req, res) {
	while (data[i].length != 0) {
		var audio = new AudioModel({
			_id: i,
			text: data[i][0],
			start: data[i][1],
			stop: data[i][2]
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

exports.open = function(req, res) {
	AudioModel.find().sort({'_id': 1}).exec(function(err, audio) {
		res.render("unscramble.jade", {title: "unscramble", audios: audio});
	});
};