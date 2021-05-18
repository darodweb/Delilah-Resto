var jwt = require('jsonwebtoken');
var sign = 'admin558936';

const actions = require('./actions');

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
        return res.send('Acceso denegado.');
    }
}

module.exports.verifyAdmin = async function (req, res, next) {
    function decode(token) {
        return jwt.verify(token, sign);
    }
    var token = req.headers.authorization;
    if (token) {
        var decoded = decode(token, sign);
        var username = decoded.user;
        var password = decoded.password;
        var admin = await actions.get(`SELECT * FROM usuarios WHERE username="${username}" AND password="${password}" AND  rol="1"`);
        if (admin.length > 0) {
            req.user = decoded;
            next();
        } else { res.send('No tiene permisos para agregar productos') }
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

// module.exports.verifyAdmin = async function (req, res, admin) {
//     function decode(token) {
//         return jwt.verify(token, sign);
//     }
//     var token = req.headers.authorization;
//     if (token) {
//         var decoded = decode(token);
//         if (decoded) {
//             var userName = decoded.userName;
//             var password = decoded.password;
//             var rol = decoded.rol;
//             const admins = await actions.get(`SELECT * FROM usuarios WHERE rol = "1"`)
//             var isAutenticated = admins.filter(user =>
//                 admin.user === username && admin.password === password && admin.rol === rol);
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