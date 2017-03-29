var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/'+'api-demo');

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
  res.json({'message':'hurreh! Welcome to API!'})
})

app.use('/api', require('./app/controllers/ContactController'));

app.listen(port)
console.log('Server started at ', port);