var http = require('http');
var port = process.env.port || 3000;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var controllers = require('./controllers');
var flash = require('connect-flash');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var updater = require('./updater');

//var ejsEngine = require('ejs-locals');
//app.set('view engine', 'jade');
//app.engine('ejs', ejsEngine);
//app.set('view engine', 'ejs');

app.set('view engine', 'vash');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'teste',
    resave: true, 
    saveUninitialized: true
}));
app.use(flash());

app.use(express.static(__dirname + '/public'));

var auth = require('./auth');
auth.init(app);

controllers.init(app);

app.get('/api/users', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send({ name: 'kaká', isValid: true, group: 'Admin' });
})

var server = http.createServer(app);
server.listen(port);

updater.init(server);