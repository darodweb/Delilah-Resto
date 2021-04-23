var jwt = require('jsonwebtoken');

var sign = 'admin558936';

module.exports.generateToken = function (data) {
    return jwt.sign(data, sign);
}

module.exports.decode = function (token) {
    return jwt.verify(token, sign);
}

module.exports.verifyUser = function (req, res, clientes) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = this.decode(token);
        if (decoded) {
            var userName = decoded.userName;
            var password = decoded.password;
            var isAutenticated = clientes.filter(user => user.user === userName && user.password === password);
            if (isAutenticated.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}