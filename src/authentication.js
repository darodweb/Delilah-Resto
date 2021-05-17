var jwt = require('jsonwebtoken');

var sign = 'admin558936';

module.exports.generateToken = function (data) {
    return jwt.sign(data, sign);
}


module.exports.verifyUser = function (req, res, next) {

    function decode(token) {
        return jwt.verify(token, sign);
    }
    var token = req.headers.authorization;
    if (token) {
        var decoded = decode(token, sign);
        if (decoded) {
            req.user = decoded;
            next();
        }
    } else {
        return false;
    }
}

// module.exports.verifyUser = function (req, res, usuarios) {
//     var token = req.headers.authorization;
//     if (token) {
//         var decoded = this.decode(token);
//         if (decoded) {
//             var userName = decoded.username;
//             var password = decoded.password;
//             var isAutenticated = usuarios.filter(user => user.user === username && user.password === password);
//             if (isAutenticated.length > 0) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     } else {
//         return false;
//     }
// }

//How can I validate rol?

module.exports.verifyAdmin = function (req, res, admin) {
    function decode(token) {
        return jwt.verify(token, sign);
    }
    var token = req.headers.authorization;
    if (token) {
        var decoded = decode(token);
        if (decoded) {
            var userName = decoded.userName;
            var password = decoded.password;
            var rol = decoded.rol;

            var isAutenticated = admin.filter(user =>
                admin.user === username && admin.password === password && admin.rol === rol);
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