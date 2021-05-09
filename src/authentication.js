var jwt = require('jsonwebtoken');

var sign = 'admin558936';

module.exports.generateToken = function (data) {
    return jwt.sign(data, sign);
}

module.exports.decode = function (token) {
    return jwt.verify(token, sign);
}

module.exports.verifyUser = function (req, res, usuarios) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = this.decode(token);
        if (decoded) {
            var userName = decoded.username;
            var password = decoded.password;
            var isAutenticated = usuarios.filter(user => user.user === userName && user.password === password);
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

//How can I validate rol?

module.exports.verifyAdmin = function (req, res, admin) {
    var token = req.headers.authorization;
    if (token) {
        var decoded = this.decode(token);
        if (decoded) {
            var userName = decoded.userName;
            var password = decoded.password;
            var rol = decoded.rol;

            var isAutenticated = admin.filter(user =>
                admin.user === userName && admin.password === password && admin.rol === rol);
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