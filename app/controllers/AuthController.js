var express = require('express');

var User = require('../models/UserModel')
var api = express.Router();

var config = require('config');
var jwt = require('jsonwebtoken');

api.post('/auth', function(req, res){
  User.findOne({
    email: req.body.email,
  }, function(err, user){
    console.log('req.body')
    if(err)
      throw err;

    if(!user){
      res.json({
        success: false,
        message: 'Authentication failed. User not found'
      })
    }else if(user){
      if(user.password !== req.body.password){
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password'
        })
      }else{
        log.info(user.email);
        var token = jwt.sign(user._id, req.app.get('superSecret'), {
          expiresIn: 60*60
        });

        res.json({
          success: true,
          message: 'token!',
          token: token
        })
      }
    }
  })
})

module.exports = api;