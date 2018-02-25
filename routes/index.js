var express = require('express');
var router = express.Router();
var user = require("./users");
var auth = require("./auth");


router.post('/login', auth.login);
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('token');
            res.status(200);
            res.json({
              "status": 200,
              "message": "logout successfully"
            });
        }
    });

});
router.post('/api/v1/createUser', user.createUser);
router.get('/api/v1/find', [require("../middlewares/ApiAuthentication")], user.find);

module.exports = router;