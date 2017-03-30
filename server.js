var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config')

// User native Promises
mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:' + err);
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
})
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

process.on('SIGINT', function(){
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  })
})

mongoose.connect(`${config.get('mongo_url')}${config.get('mongo_dbs.proj1')}`)
.then(() => {
  console.log('Connected')
})
.catch((err) => {
  console.log(err.message);
});

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res){
  res.json({'message':'hurreh! Welcome to API!'})
})

app.use('/api', require('./app/controllers/ContactController'));

var port = process.env.PORT || config.get('port');
app.listen(port)
console.log('Server started at ', port);