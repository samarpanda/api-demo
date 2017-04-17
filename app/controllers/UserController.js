var express = require('express');

var User = require('../models/UserModel')
var Response = require('../utils/response')
var api = express.Router();

api.post('/user', function(req, res){
  req.body.created_at = new Date();
  req.body.updated_at = null;
  var user = new User(req.body);
  user.save(function(err, user){
    if(!err){
      req.body.id = user.id;
      var resData = Response.data(req.body);
      res.send(resData);
    }else{
      var resError = Response.error({
        code: "500",
        message: "Internal Server Error"
      })
      log.error(err);
      res.status(500).send(resError);
    }
  });
});

// Get details by id
api.get('/user/:id', function(req, res){
  User.findById(req.params.id, function(err, doc){
    if(!err){
      var resData = Response.data(doc);
      res.send(resData);
    }else{
      log.error(err);
    }
  });
});

// Update by id
api.put('/user/:id', function(req, res){
  req.body.updated_at = new Date();
  User.findOneAndUpdate({"_id":req.params.id}, {$set: Object.assign({}, req.body)}, {upset: true}, function(err, doc){
    if(!err){
      var resData = Response.data(doc._id);
      res.send(resData);
    }else{
      log.error(err);
    }
  });
});

module.exports = api;