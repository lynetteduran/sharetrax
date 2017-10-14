var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var neo4j = require('neo4j-driver').v1;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Application Set-up
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
app.get('/', function(req, res){
  res.send('It Works');
});
var session = driver.session();

app.listen(port);
console.log('I can hear you breathe...on port:' + port);

module.exports = app;
