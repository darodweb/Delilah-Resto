const express = require('express');
const server = express();
var actions = require('./actions');
const { request } = require('express');

const bodyParser = require('body-parser');
var authentication = require('./authentication');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

//Middleware para la gestión del body
server.use(express.json());

//Para limitar el intento de peticion al servidor
const apiLimiterLogin = rateLimit({
  max: 10
});

server.use(helmet());
// server.use(bodyParser());
server.use('/', apiLimiterLogin);

const port = 3001;

//-------------- CLIENTES Endpoints--------------------------------

var clientes = [];

server.get('/users', authentication.verifyUser, async (req, res) => {
  const users = await actions.get('SELECT * FROM users');
  res.send('users');
});

server.get('/user/:id', authentication.verifyUser, async (req, res) => {
  const user = await actions.get('SELECT * FROM users WHERE id = :id', { id: req.params.id });
  res.send(user);
});


server.post('/user', authentication.verifyUser, async (req, res) => {
  const user = await actions.create(
    `INSERT INTO users (userName, name, email, phone, address, password) 
      VALUES (:userName, :name, :email, :phone, :address, :password)`,
    req.body);
  res.send(user);
});

server.put('/user/:id', authentication.verifyUser, async (req, res) => {
  const user = await actions.update(
    `UPDATE users SET userName =:userName, name =:name, email =:email, phone=:phone, address=:address, password=:password  
      WHERE id=:id`,
    { ...req.body, id: req.params.id });
  res.send(req.body);
});

server.delete('/user/:id', authentication.verifyUser, async (req, res) => {
  const user = await actions.delete(
    `DELETE FROM users   
      WHERE id=:id`,
    { id: req.params.id });
  res.send(req.body);
});

//Client login
server.post('/login', async (req, res) => {
  var arg = req.body;
  var user = arg.user;
  var password = arg.password;
  const usuarios = await actions.get('SELECT * FROM users WHERE userName = :user AND password = :password', { user, password })
  var isAutenticated = usuarios.filter(userf => userf.userName === user && userf.password === password);
  if (isAutenticated.length > 0) {
    var data = { user, password };
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
});

server.post('/cliente/', (req, res) => {
  let userverified = authentication.verifyUser(req, res, clientes);
  if (userverified) {
    res.send(clientes);
  } else {
    res.send('Error: Ha ocurrido un problema con el token');
  }
  res.send('cliente');
});


server.put('/cliente', (req, res) => {
  let userverified = authentication.verifyUser(req, res, clientes);
  if (userverified) {
    res.send(clientes);
  } else {
    res.send('Error: Ha ocurrido un problema con el token');
  }
  res.status(201).send();
});

server.delete('/cliente/', (req, res) => {
  let userverified = authentication.verifyUser(req, res, clientes);
  if (userverified) {
    res.send(clientes);
  } else {
    res.send('Error: Ha ocurrido un problema con el token');
  }
  res.status(201).send();
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
  let userverified = authentication.verifyUser(req, res, clientes);
  if (userverified) {
    res.send(clientes);
  } else {
    res.send('Error: Ha ocurrido un problema con el token');
  }
  res.status(201).send();
  res.send('Crea pedido');
});

server.put('/pedido/', (req, res) => {
  let userverified = authentication.verifyUser(req, res, clientes);
  if (userverified) {
    res.send(clientes);
  } else {
    res.send('Error: Ha ocurrido un problema con el token');
  }
  res.status(201).send();
  res.send('Pedido modificado');
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