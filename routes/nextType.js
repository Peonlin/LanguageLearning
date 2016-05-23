var path = require('path');
var mongoose = require('mongoose');
var xlsx = require('node-xlsx');
var http = require('http');

exports.getNext = function(req, res) {
	//res.redirect('login');
	var tour = req.body.tour;
	var unit = req.body.unit;
	var type = req.body.type;
	var isLast = 0;
	var name = path.dirname(__dirname);
	var obj = xlsx.parse(name + "/app/excel/SCRIPT.xlsx");
	var data = obj[0].data;
	var i = 1;
	for (i = 1; i < data.length; i++) {
		//找到tour值相同的区域，然后找到下一个unit
		if (data[i][0] != undefined) {
			if (data[i][0] != tour)
				continue;
			else {
				while (i < data.length && data[i][1] != unit) {
					i++;
				}
				console.log(i);
				while (i < data.length && data[i][2] != type) {
					i++;
				}
				console.log(i);
				if (i < data.length && i != data.length - 1) {
					i++;
				}
				else {
					console.log('last one');
					isLast = 1;
				}
				break;
			}
		}
	}
	//根据题型的名字，和返回的题号
	if (i < data.length) {
		if (((data[i][0] != undefined && data[i][0] == tour && data[i][1] == unit) || data[i][0] == undefined) && !isLast) {
			var res_url = '/' + data[i][2] + '?language=en&tour=' + tour + '&unit=' + unit + '&set=' + data[i][3];
			res.send(res_url);
		}
		else {
			if (req.cookies.account != null && data[i][0] != undefined) {
				var userModel = mongoose.model('Users');
				userModel.update({username: req.cookies.account.username}, {
					$set: {current_unit: data[i][0], current_tour: data[i][1], current_type: data[i][2]}
				}, function(err) {
					if (err) {
						console.log(err);
						return
					}
				});
			}
			res.send('/progressmap');
		}
	}
	else {
		console.log(i);
		res.send('/progressmap');
	}
};
