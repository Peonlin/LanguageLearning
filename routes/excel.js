var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var xlsx = require('node-xlsx');
var fs = require('fs');


exports.open = function(req, res, next) {
// write
	var type = req.body.select;
	var data;
	//if (req.body.select == 'interactive')
	switch(type) {
		case "narra":
			data = [['Set', 'Random order?', 'Slide', 'Review?', 'Q=ti,A=v', 'Q=tv,A=i', 'Q=iv,A=t', 'Q=v,A=ti', 'Q=i,A=tv',
				'Q=t,A=iv', 'Q=t,A=i', 'Q=t,A=v', 'Q=v,A=t', 'Q=v,A=i',	'Q=i,A=t', 'Q=i,A=v', 'Image filename', 
				'Multiple choice?', 'Auto-play?', 'Disable audio prompt?', 'Enable emphasis?']];
			break;
		case "agbb":
			data = [['Set',	'Comment', 'Question', 'A', 'A_font', 'Language', 'Speaker', 'B', 'B alternative I', 'B alternative II',
			 	'B alternative III', 'B_font',	'Language',	'Speaker']];
			var aggbModel = mongoose.model('a_given_b_blank');
			aggbModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i]._set, list[i].comment, list[i].question, list[i].top, list[i].a_font, list[i].a_language, list[i].a_speaker,
						list[i].bottom, list[i].bottom_1, list[i].bottom_2, list[i].bottom_3, list[i].b_font, list[i].b_language, list[i].b_speaker);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('C:/Users/Sauce/Desktop/A_GIVEN_B_BLANK.xlsx', buffer, 'binary');
			});
			break;
		case "agbc":
			data = [['Set',	'Comment', 'Question', 'A', 'A_font', 'Language', 'Speaker', 'B', 'B alternative I', 'B alternative II', 'B_font',
				'Language', 'Speaker']];
			break;
		case "acbg":
			data = [['Set',	'Comment', 'Question', 'A',	'A alternative I', 'A alternative II', 'A_font', 'Language', 'Speaker', 'B', 'B_font',
				'Language',	'Speaker']];
			break;
		case "unscr":
			data = [['Set',	'Comment', 'Question', 'TOP', 'BOTTOM',	'1_font', 'Language', 'Speaker', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6',
				'U7', 'U8', 'U9', '2_font',	'Language', 'Speaker']];
			break;
		case "l_n_m":
			data = [['Set',	'Comment', 'Question', 'A',	'A_font', 'Language', 'Speaker', 'B', 'B_font',	'C', 'C_font', 'Language', 
				'Speaker']];
			break;
		case "multichoice":
			data = [['Set',	'Comment', 'Question', 'MAIN SENTENCE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'A_font', 'Language',
				'Speaker']];
			break;
		case "muc":
			data = [['Set', 'Comment', 'Question', 'GIVEN', '1_font', 'Language', 'Speaker', 'DESIRED', 'PIECE-01', 'PIECE-02',	'PIECE-03',
				'PIECE-04',	'PIECE-05',	'PIECE-06',	'PIECE-07', 'PIECE-08', '2_font', 'Language', 'Speaker']];
			break;
		case "user":
			data = [['username', 'Email', 'Phone', 'Current_tour', 'Current_lesson']];
			var userModel = mongoose.model('Users');
			userModel.find().sort({'_id': 1}).exec(function(err, list) {
				for (var i = 0; i < list.length; i++) {
					var tmp = [];
					tmp.push(list[i].username, list[i].email, list[i].phone, list[i].Current_lesson, list[i].Current_tour);
					data.push(tmp);
				}
				var buffer = xlsx.build([{name: "mySheetName", data: data}]);
				fs.writeFileSync('C:/Users/Sauce/Desktop/Users.xlsx', buffer, 'binary');
			});
			break;
	}
	
	res.send('export successfully!');
};

exports.upload = function(req, res) {
	if(!/multipart\/form-data/i.test(req.headers['content-type'])){
		return res.end('wrong');
	}
	var fstream;
	console.log(1);
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream('./app/excel/' + filename);
        file.pipe(fstream);
    });
	var aggbModel = mongoose.model('a_given_b_blank');
	aggbModel.remove({}, function(err) {
		res.redirect('/init_aggb');
	});
} 
