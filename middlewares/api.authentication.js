/*jshint sub:true*/
var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(token, require("../config/secret")(), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token '+err.message,
                    expiredAt:err.expiredAt,

                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }


};

function decode_EXP_to_Time(decoded) {
    var d1 = new Date(decoded.exp).getTime();
    return d1;
}

function decode_IAT_to_Time(decoded) {
    var d2 = new Date(decoded.iat).getTime();
    return d2;

}