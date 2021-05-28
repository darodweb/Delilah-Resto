const express = require('express');
const server = express();
var actions = require('./actions');

const bodyParser = require('body-parser');
var authentication = require('./authentication');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinition');

const usuarios = require('./routes/usuarios');
const productos = require('./routes/productos');
const pedidos = require('./routes/pedidos');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


//Para limitar el intento de peticion al servidor
const apiLimiterLogin = rateLimit({
  max: 10000
});

const port = 3001;

const options = {
  ...swaggerDefinition,
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsDoc(options);

//Middlewares
server.use(helmet());
// server.use(express.json());
server.use(bodyParser());
server.use('/', apiLimiterLogin);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
server.use('/', usuarios,);
server.use('/', productos);
server.use('/', pedidos);

// login
server.post('/login', async (req, res) => {
  var arg = req.body;
  var user = arg.username;
  var password = arg.password;
  const usuarios = await actions.get('SELECT * FROM usuarios WHERE username = :user AND password = :password', { user, password })
  if (usuarios.length > 0) {
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


server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});