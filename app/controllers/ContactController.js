var express = require('express');
var mongoose = require('mongoose');
var api = express.Router();

var Contact = require('../models/ContactModel');

var api = express.Router();

// Create
api.post('/contact', function(req, res) {
  req.body.created_at = new Date();
  req.body.updated_at = null;
  var contact = new Contact(req.body);
  contact.save(function(err, contact){
    req.body.id = contact.id;
    res.send({data: req.body, status: true, errCode: "", errMsg: ""});
  });
});

// Get all
api.get('/contacts', function(req, res) {
  Contact.find({}, {__v: 0}, function(err, records) {
    res.send({data: records, status: true, errCode: "", errMsg: ""});
  });
});

// Get details by id
api.get('/contact/:id', function(req, res){
  Contact.findById(req.params.id, function(err, doc){
    res.send({data: doc, status: true, errCode: "", errMsg: ""})
  });
})

// Update by id
api.put('/contact/:id', function(req, res){
  req.body.updated_at = new Date();
  Contact.findOneAndUpdate({"_id":req.params.id}, {$set: Object.assign({}, req.body)}, {upset: true}, function(err, doc){
    res.send({data: doc._id, status: true, errCode: "", errMsg: ""});
  })
});

// Delete by id
api.delete('/contact/:id', function(req, res){
  Contact.deleteOne({"_id":req.params.id}, function(err, doc){
    res.send({status: true, errCode: "", errMsg: ""})
  })
})

module.exports = api;