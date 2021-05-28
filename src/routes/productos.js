const express = require('express');
const router = express.Router();

const actions = require('../actions');
const authentication = require('../authentication');


router.get('/productos', authentication.verifyUser, async (req, res) => {
    const productos = await actions.get('SELECT * FROM productos');
    res.send(productos);
});


router.get('/producto/:id', authentication.verifyUser, async (req, res) => {
    const producto = await actions.get('SELECT * FROM productos WHERE id = :id', { id: req.params.id });
    res.send(producto);
});

router.post('/producto/', authentication.verifyAdmin, async (req, res) => {
    const producto = await actions.create(
        `INSERT INTO productos (foto, descripcion, precio) VALUES (:foto, :descripcion, :precio)`,
        req.body);
    res.send(`Producto creado satisfactoriamente.`);
});

router.put('/producto/:id', authentication.verifyAdmin, async (req, res) => {
    const producto = await actions.update(
        `UPDATE productos SET foto = :foto, descripcion = :descripcion, precio = :precio WHERE id = :id`,
        { ...req.body, id: req.params.id });
    res.send('Producto actualizado satisfactoriamente');

});

router.delete('/producto/:id', authentication.verifyAdmin, async (req, res) => {
    const producto = await actions.delete(
        `DELETE FROM productos WHERE id = :id`,
        { id: req.params.id });
    res.send('Producto eliminado satisfactoriamente');
});

module.exports = router;