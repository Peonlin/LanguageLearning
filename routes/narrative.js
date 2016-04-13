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
    slide: Number,
    type: String,
    img_files: Array,
    audio: String,
    auto_play: String
});

var img_schema = new Schema({
	_id: Number,
	filename: String,
	asso_texts: Array,
	font: String,
	asso_audio: String
});

var naModel = mongoose.model('narrative', schema);
var imgModel = mongoose.model('image_index', img_schema);

var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var nar_obj = xlsx.parse(name + "/app/excel/Narration.xlsx");
var image_index = xlsx.parse(name + "/app/excel/Image-index.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = nar_obj[0].data;
var img_data = image_index[0].data;
var i = 1;

exports.init_img = function(req, res) {
	var id = 1;
	while (i < img_data.length) {
		if (img_data[i][0] != undefined) {
			var j = 0;
			var filename = img_data[i][0];
			var text_arr = [];
			text_arr[j++] = img_data[i][1];
			var font = img_data[i][2];
			var asso_audio = img_data[i][3];
			i++;
			while (i < img_data.length && img_data[i][0] == undefined) {
				text_arr[j++] = img_data[i++][1];
			}
		}
		var img_list = new imgModel ({
			_id: id,
			filename: filename,
			asso_texts: text_arr,
			font: font,
			asso_audio: asso_audio
		});
		img_list.save();
		id++;
	}
}
exports.init = function(req, res) {
	i = 1;
	var set = 1;
	var id = 1;
	var count = 0;
	var slide_tmp = 1;
	var text_arr = [];
	var type_tmp = data[1][2];
	while (i < data.length) {
		if (data[i][3] == undefined)
			break;
		if (data[i][0] != undefined)
			set = data[i][0];
		if (data[i][3] != undefined) {
			if ((data[i][1] != undefined && data[i][1] != slide_tmp))
				slide_tmp = data[i][1];
			if ((data[i][2] != undefined && data[i][2] !=  type_tmp))
				type_tmp = data[i][2];
			var img_arr = [];
			var k = 0;
			var slide = slide_tmp;
			var type = type_tmp;
			var img_filename = data[i][3];
			var audio = data[i][4];
			var auto_play = data[i][5];
			var flag = 0;
			var img_data1 = image_index[0].data;
			for (var q = 0; q < img_data1.length; q++) {
				if (img_data1[q][0] != undefined && img_data1[q][0] == img_filename) {
					if (img_data1[q][1] != undefined)
						img_arr.push(img_data1[q][1]);
					q++;
					while (q < img_data1.length && img_data1[q][0] == undefined) {
						if (img_data1[q][1] != undefined)
							img_arr.push(img_data1[q][1]);
						q++;
						flag = 1;
					}
				}
				if (flag)
					break;
			}
			//var text_arr = [];
			var file_tmp = data[i][3];
			var result;
			var tmp1;

			var text_arr = [];
			text_arr.push({"image_filename": img_filename, "associated_texts": img_arr});
			var list = new naModel({
				_id: id,
			    _set: set,
			    slide: slide,
			    audio: audio,
			    type: type,
			    auto_play: auto_play,
			    img_files: text_arr
			});
			list.save();
			id++;
			i++;
		}
	}
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
		var res_arr = [];
		var set_arr = [];
		var slide_arr = [];
		var image_arr = [];
		var cur_set = 1;
		var cur_type;
		var flag = 1;
		for (var i = 0; i < list.length;) {
			var cur_slide = 1;
			while (i < list.length && list[i]._set == cur_set) {
				while (i < list.length && list[i].slide == cur_slide) {
					console.log(list[i].slide + cur_slide);
					cur_type = list[i].type;
					image_arr.push({"image": list[i].img_files, "audio": list[i].audio, "auto_play": list[i].auto_play});
					i++;
				}
				slide_arr.push({"slide_id": cur_slide, "slide_type": cur_type, "images_info": image_arr});
				cur_slide++;
				set_arr.push(slide_arr);
				image_arr = [];
				slide_arr = [];
			}
			res_arr.push({"set_id": cur_set, "slides_list": set_arr});
			set_arr = [];
			cur_set++;
		}
		// if (req.cookies.account != null)
		// 	res.render("narrative.jade", {title: "narrative", lists: list});
		// else
		// 	res.render("narrative.jade", {title: "narrative", lists: list});
		res.json(res_arr);
	});
};