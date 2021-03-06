const express = require('express');
const router = express.Router();

const actions = require('../actions');
const authentication = require('../authentication');

router.get('/pedidos', authentication.verifyAdmin, async (req, res) => {
    const pedidos = await actions.get(`SELECT e.id as Estado, p.hora as Hora, p.id as Numero, p.descripcion as Descripcion,
    f.id as Forma_de_Pago, p.total as Total, u.nombre as Usuario,
    u.direccion as Direccion FROM pedidos AS p
    INNER JOIN usuarios AS u ON (p.usuario_id = u.id)
    INNER JOIN forma_de_pago as f ON (p.forma_de_pago = f.id)
    INNER JOIN estados as e ON (e.id = p.estado )`);
    res.send(pedidos);
});

router.get('/pedido/:id', authentication.verifyUser, async (req, res) => {
    const pedido = await actions.get(`SELECT p.id, pr.descripcion as Articulo, pr.precio as Precio,
    u.nombre as Usuario, f.descripcion as Forma_de_Pago, e.descripcion as Estado,
    d.total, p.total as Total 
    FROM detalle_de_pedido as d 
    INNER JOIN pedidos as p ON (p.id = d.id) 
    INNER JOIN productos as pr ON (pr.id = d.id_producto) 
    INNER JOIN usuarios as u ON (u.id = p.usuario_id)
    INNER JOIN forma_de_pago as f ON (f.id = p.forma_de_pago) 
    INNER JOIN estados as e ON (e.id = p.estado)`, { id: req.params.id });
    res.send(pedido);
});

router.post('/pedido/', authentication.verifyUser, async (req, res) => {
    const orden = req.body
    console.log(orden);
    console.log(orden.direccion);
    const formaDePago = Number(orden.forma_de_pago);
    const currentUsername = String(req.user.user);
    const currentUserPassword = String(req.user.password);
    const user = await actions.get(`SELECT * FROM usuarios WHERE username="${currentUsername}" AND password="${currentUserPassword}"`);

    const submittedOrder = await actions.create(
        `INSERT INTO pedidos (forma_de_pago, usuario_id) VALUES (:forma_de_pago, :usuario_id)`,
        { forma_de_pago: formaDePago, usuario_id: user[0].id });

    const orderId = submittedOrder[0];
    console.log(`Order ID is ${orderId}`);

    let productArray = orden.producto;
    console.log(productArray);

    for (const element of productArray) {
        var productosRespuesta = await actions.create(`
            INSERT INTO detalle_de_pedido (id, id_producto, cantidad)
            VALUES (:id, :id_producto, :cantidad)`,
            { id: orderId, id_producto: element.id, cantidad: element.cantidad });
    }

    //Consultar sumas de los productos y sus nombres.  (CHECK THIS SECTION. dataDeOrdenActualizada is retorna array vacio con el segundo pedido)

    const dataDeOrdenActualizada = await actions.get(`
      SELECT de.id, GROUP_CONCAT(CONCAT(p.descripcion, ' x', de.cantidad) SEPARATOR' ') AS descripcion, SUM(p.precio * de.cantidad) AS total 
      FROM detalle_de_pedido as de 
      INNER JOIN productos AS p ON p.id = de.id_producto 
      WHERE de.id = :order_id GROUP BY de.id`,
        { order_id: orderId });

    console.log(`datadeOrdenActualizada: ${dataDeOrdenActualizada.length}`);

    //Actualizar TOTAL y DESCRIPTION en la tabla pedidos

    const actualizacionDeOrden = await actions.update(`
      UPDATE pedidos SET estado = 1, numero = :order_id, descripcion = :descripcion, total = :total, direccion = :direccion WHERE id = :order_id`,
        { descripcion: dataDeOrdenActualizada[0].descripcion, total: dataDeOrdenActualizada[0].total, direccion: orden.direccion, order_id: orderId });

    if (actualizacionDeOrden[1] == 1) {
        res.status(201).json({ Message: 'Pedido creado satisfactoriamente.', order: req.body });
        return;
    };
});

router.put('/pedido/:id/estado/:estado', authentication.verifyAdmin, async (req, res) => {
    const pedido = await actions.update(
        `UPDATE pedidos SET estado = :estado WHERE id = :id`,
        { ...req.body, estado: req.params.estado, id: req.params.id });
    res.status(201).json({ Message: 'Pedido actualizado satisfactoriamente' });

});

router.delete('/pedido/:id', authentication.verifyUser, async (req, res) => {
    const pedido = await actions.delete(
        `DELETE FROM pedidos WHERE id = :id`,
        { id: req.params.id });
    res.status(201).json({ Message: 'Pedido eliminado satisfactoriamente' })

});

module.exports = router;