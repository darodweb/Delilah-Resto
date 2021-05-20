const express = require('express');
const router = express.Router();

const actions = require('../actions');
const authentication = require('../authentication');

router.get('/pedidos', authentication.verifyUser, async (req, res) => {
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
    INNER JOIN estados as e ON (e.id = p.estado) WHERE id = :id`, { id: req.params.id });
    res.send(pedido);
});

router.post('/pedido/', authentication.verifyUser, async (req, res) => {
    const pedido = await actions.create(
        `INSERT INTO pedidos (foto, descripcion, precio) VALUES (:foto, :descripcion, :precio)`,
        req.body);
    console.log(pedido);
    res.send(`pedido creado satisfactoriamente.`);
});

router.put('/pedido/:id', authentication.verifyAdmin, async (req, res) => {
    const pedido = await actions.update(
        `UPDATE pedidos SET foto = :foto, descripcion = :descripcion, precio = :precio WHERE id = :id`,
        { ...req.body, id: req.params.id });
    res.send('pedido actualizado satisfactoriamente');

});

router.delete('/pedido/:id', authentication.verifyAdmin, async (req, res) => {
    const pedido = await actions.delete(
        `DELETE FROM pedidos WHERE id = :id`,
        { id: req.params.id });
    res.send('pedido eliminado satisfactoriamente');
});

module.exports = router;