var jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || (req.cookies && req.cookies['x-access-token']);
    try {
        if (token) {
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
    } catch (err) {
        console.log(err);
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