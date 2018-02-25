var express = require('express');
var router = express.Router();

var User = require("../models/User");
var Role = require("../models/Role");
var mongoose = require('mongoose');
var q = require("q");
module.exports = {

  createUser: function (req, res) {
    var r = new Role();
    r.name = 'admin';
    r.save(function (err, data) {
      var user = new User();
      user.userName = 'lolll';
      user.roleCode = data.id;
      user.save(function (err, data) {
        res.json({
          "message": "user has been created"
        });

      });

    });
  },
  find: function (req, res) {
    User.find({}).populate('roleCode').
    exec(function (err, data) {
      res.json({
        "records": data
      });
    });

  },

  findByUserAndPassword: function (username, password) {
    var deffered = q.defer();
    User.find({
      userName: username,
      password: password
    }).populate('roleCode').
    exec(function (err, data) {
      if (err) deffered.reject(err);
      deffered.resolve(data);
    });
    return deffered.promise;
  }

};