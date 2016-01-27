var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var xlsx = require('node-xlsx');
var fs = require('fs');


exports.open = function(req, res, next) {
// write
	var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
	var buffer = xlsx.build([{name: "mySheetName", data: data}]);
	fs.writeFileSync('C:/Users/Sauce/Desktop/b.xlsx', buffer, 'binary');
	res.send('export successfully!');
};