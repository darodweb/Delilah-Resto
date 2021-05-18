const express = require('express');
const router = express.Router();

const actions = require('../actions');
const authentication = require('../authentication');

router.get('/pedidos', authentication.verifyUser, async (req, res) => {
    const pedidos = await actions.get('SELECT * FROM pedidos');
    res.send(pedidos);
});


router.get('/pedido/:id', authentication.verifyUser, async (req, res) => {
    const pedido = await actions.get('SELECT * FROM pedidos WHERE id = :id', { id: req.params.id });
    res.send(pedido);
});

router.post('/pedido/', authentication.verifyAdmin, async (req, res) => {
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