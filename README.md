# README - Delilah Resto API

Conjunto de API REST desarrollados para un restaurante en linea. 
Tecnologias usada: Node.js, Express, MySql


# Pasos a seguir

 1. Clonar repositorio
 2. Importar archivo `delilah_resto_db.sql` a la base de datos
 3. Ejecutar el comando `npm install` para instalar todas las dependencias
 4. Iniciar el servidor con el comando `npm start`
 5. El servidor está configurado para funcionar en el puerto 3001.  [http://localhost:3001]
 6. La documentacion se encuentra en el archivo `spec.yaml`

## Recomendaciones de uso

 - Registrar un usuario o admin
 - Iniciar sesion en el endpoint `/login`
 - Crear, actualizar, eliminar  productos 
 - Crear, actualizar, eliminar  pedidos
 > Solamente usuarios 'admin' tienen permiso para crear/modificar productos,  editar usuarios y estados de pedidos existentes. 
 > Usuarios registrados en el endpoint `/admin` se les asigna un rol numerico de *administrador*:  `rol` = `'1'`
 > Usuarios registrados en el endpoint `/usuario` se les asigna un rol numerico de *usuario*: `rol` = `'2'`





