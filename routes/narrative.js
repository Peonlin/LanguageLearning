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
    random_order: String,
    slide: Number,
    review: String,
    status: String,
    image_filename: String,
    multiple_choice: String,
    auto_play: String,
    disable_audio_promt: String,
    enable_emphasis: String
});

var naModel = mongoose.model('narrative', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/Narration.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;

exports.init = function(req, res) {
	var set_tmp = 0;
	var comment_tmp = "dsa";
	var ro_tmp = "sda";
	var review_tmp = "ds";
	var slide_tmp = "ds";

	while (i < data.length) {
		if (data[i][2] == undefined && data[i][16] == undefined)
			break;
		if (data[i][2] != undefined) {
			slide_tmp = data[i][2];
			if (slide_tmp == 1) {
				set_tmp = data[i][0];
				ro_tmp = data[i][1];
				review_tmp = data[i][3];
			}
		}
		var status_tmp = 0;
		for (var b = 0; b < 12; b++) {
			if (data[i][4+b] != undefined)
				status_tmp = b;
		}

		var list = new naModel({
			_id: i,
    		_set: set_tmp,
		    random_order: ro_tmp,
		    slide: slide_tmp,
		    review: review_tmp,
		    status: status_tmp,
		    image_filename: data[i][16],
		    multiple_choice: data[i][17],
		    auto_play: data[i][18],
		    disable_audio_promt: data[i][19],
		    enable_emphasis: data[i][20]
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
		var cond = {image_filename: data[i][16]};
		naModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	naModel.find().sort({'_id': 1}).exec(function(err, list) {
		if (req.session.user)
			res.render("narrative.jade", {title: "narrative", lists: list});
		else
			res.render("narrative.jade", {title: "narrative", lists: list});
			// res.redirect('/login');
		//res.json(list);
	});
};