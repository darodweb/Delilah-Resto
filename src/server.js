const express = require('express');
const server = express();
// const bodyParser = require('body-parser');
var authentication = require('./authentication');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Middleware para la gestión del body
server.use(express.json());

// Para limitar el intento de peticion al servidor
const apiLimiterLogin = rateLimit({
    max: 10
});

const port = 3001;

server.use(helmet());
// server.use(bodyParser());
server.use('/', apiLimiterLogin);

server.get('/', (req, res) => {
    res.send('Bienvenidos a mi Delilah Resto');
});


//-------------- CLIENTES Endpoints--------------------------------
var clientes = [];

server.get('/clients', (req, res) => {
    res.send('Listado de clientes');
});

server.get('/cliente/{ID}', (req, res) => {
    res.send('cliente');
});


//Client login
server.post('/cliente/login', (req, res) => {

    var arg = req.body;
    var userName = arg.user;
    var password = arg.password;
    var isAutenticated = clientes.filter(user => user.user === userName && user.password === password);
    if (isAutenticated.length > 0) {
        var data = { userName, password };
        var token = authentication.generateToken(data);
        res.send({
            result: 'OK',
            token
        });
    } else {
        res.send({
            result: 'ERROR'
        });
    }
    res.send('cliente');
});

server.post('/cliente/', (req, res) => {
    const userverified = authentication.verifyUser(req, res, clientes);
    if (userverified) {
        res.send(clientes);
    } else {
        res.send('Error: ah ocurrido un problema con el token');
    }
    res.send('cliente');
});

server.put('/cliente/', (req, res) => {
    res.send('cliente');
});

server.delete('/cliente/', (req, res) => {
    res.send('cliente');
});


//-------------- PEDIDOS Endpoints--------------------------------

var pedidos = [];

server.get('/pedidos', (req, res) => {
    res.send('Listado de Pedidos');
});

server.get('/pedido/{ID}', (req, res) => {
    res.send('Detalle de pedido ID');
});

server.post('/pedido/', (req, res) => {
    res.send('Crea pedido');
});

server.put('/pedido/', (req, res) => {
    res.send('Pedido modificado');
});

server.delete('/pedido/', (req, res) => {
    res.send('Pedido eliminado');
});



//-------------- PRODUCTOS Endpoints--------------------------------

var productos = [];

server.get('/productos', (req, res) => {
    res.send('Listado de Platos');
});

server.get('/producto/{ID}', (req, res) => {
    res.send('Detalle de producto ID');
});

server.post('/producto/', (req, res) => {
    res.send('Crea producto');
});

server.put('/producto/', (req, res) => {
    res.send('Producto modificado');
});

server.delete('/producto/', (req, res) => {
    res.send('Producto eliminado');
});



// server.post('/login', (req, res) => {
//     var arg = req.body;
//     var userName = arg.user;
//     var password = arg.password;
//     var isAutenticated = usuarios.filter(user => user.user === userName && user.password === password);
//     if (isAutenticated.length > 0) {
//         res.send('OK');
//     } else {
//         res.send('ERROR');
//     }
// });

// server.post('/register', (req, res) => {
//     var arg = req.body;

//     if (!validateEmail(arg.email)) {
//         res.send("ERROR: el correo no es tiene el formato correcto");
//     }

//     usuarios.push(arg);
//     res.send(arg);
// });

// function validateContraseña(password) {
//     var Mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     var Numeros = '1234567890';
//     var Minusculas = 'abcdefghijklmnopqrstuvwxyz';
//     for (let index = 0; index < password.length; index++) {
//         const caracter = password[index];
//         var contieneMayuscula = Mayusculas.includes(caracter);
//     }
// }

// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});