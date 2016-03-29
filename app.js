var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require("jade");
var server = require("http").createServer(app);
var routes = require('./routes/routes');
var session = require('express-session');
var busboy = require('connect-busboy');
//var users = require('./routes/users');
var app = express();
//app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(busboy());
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'app')));

app.use('/', routes);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
