//var UsersModel = require("./../models/").Users;
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/learningUser");
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
//username unique
var schema = new Schema({
    username: {type:String, unique: true},
    password: String,
    email: String,
    phone: String,
    current_tour: {type: String, default: 1},
    current_unit: {type: String, default: 1},
    language: String,
    learning_language: String,
    current_type: String
});

var UsersModel = mongoose.model('Users', schema);
exports.create = function (req, res) {
    var createUser = new UsersModel(req.body);
    //console.log(db);
    UsersModel.findOne({username:req.body.username}, function (err, user) {
        createUser.save(function (err, user) {
            if (err) {
                return res.json({err:err});
            }
            //登录存储cookie值
            res.cookie('account', {username: req.body.username}, {maxAge: 6000000});
            return res.json({message: 'success'});
        });
    });

};

exports.login = function (req, res) {
    console.log(req.body);
    UsersModel.findOne({username:req.body.username}, function (err, user) {
        if (err)
            return res.json({err:err});
        if (!user) {
            return res.json({err:'用户名不存在'});
        }
        if (user.password != req.body.password) {
            return res.json({err:'密码错误'});
        }
        res.cookie('account', {username: req.body.username}, {maxAge: 6000000});
        res.json({message: 'success'});
    });
};