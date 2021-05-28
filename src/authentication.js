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
        } else { res.send('Usuario no autorizado para realizar esta operacion.') }
    } else {
        return false;
    }
}
