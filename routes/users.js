var express = require('express');
var router = express.Router();

var User = require("../models/User");
var Role = require("../models/Role");
var mongoose = require('mongoose');
var q = require("q");
require('mongoose-query-paginate');
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
  getUsersByAllParams: function (req, res) {
    var options = {
      perPage: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 0,
      order:req.query.order || 'userName'
    };
    var query = User.find({}).populate('roleCode').populate('userPlanRef').sort(options.order);
    query.paginate(options, function (err, results) {
      if (err) throw err;
      else
        return res.json(results);
    });
  },

  findByUserAndPassword: function (username, password) {
    var deffered = q.defer();
    User.find({
      userName: username,
      password: password
    }).populate('roleCode').populate('userPlanRef').
    exec(function (err, data) {
      if (err) deffered.reject(err);
      deffered.resolve(data);
    });
    return deffered.promise;
  }

};