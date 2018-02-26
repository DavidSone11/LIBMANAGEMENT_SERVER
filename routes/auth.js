var express = require('express');
var router = express.Router();
var User = require("../models/User");
var User = require("../models/privilage");
var auth = require('basic-auth');
var jwt = require('jsonwebtoken');
var User = require("../routes/users");
var q = require("q");



module.exports = {
  login: function (req, res) {
  var decodeByApp = req.headers.authorization.split(" ")[1];
  var decoded = new Buffer(decodeByApp, 'base64').toString();
    if (decoded.split(":")[0] == '' || decoded.split(":")[1] == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    validateCredientials(decoded.split(":")[0],decoded.split(":")[1]).then(function (token) {
      res.cookie('token', token, {
         maxAge: 900000,
        httpOnly: true
      });
      return res.json(token);
    });


  }
};


var validateCredientials = function (username,password) {
  var results;
  var deffered = q.defer();
  User.findByUserAndPassword(username, password).then(function (data) {
    results = data[0]._doc;
    if (typeof results.roleCode._doc.name === 'undefined' || results.roleCode._doc.name === '') {
      var userOBJ = {
        status: 403,
        result: false,
        statusMessage: "LOGINFAIL",
        message: "Invalid username or password"
      };
      deffered.reject(userOBJ);
    } else {
      generateToken(results).then(function (token) {
        var userOBJWithToken = {
          username: results.userName,
          role: results.roleCode._doc.name,
          token: token
        };
        deffered.resolve(userOBJWithToken);
      });

    }

  });
  return deffered.promise;
};

var generateToken = function (userResults) {
  var deffered = q.defer();
  var token = jwt.sign({
    data: {
      "username": userResults.userName,
      "role": userResults.roleCode._doc.name
    }
  }, require("../config/secret")(), {
    expiresIn: tokenExpireInSecond()
  });
  deffered.resolve(token);
  return deffered.promise;
};

var tokenExpireInSecond = function () {
   return 60 * 60 * 24; // 24 hrs
 // return 60 * 1; // 2 min = 120 sec
};
var setInCookie = function(){
  res.cookie('cookiename', 'cookievalue', { maxAge: 900000, httpOnly: true });
};