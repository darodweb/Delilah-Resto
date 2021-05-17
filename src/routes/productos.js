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

router.post('/producto/', async (req, res) => {
    const producto = await actions.create(
        `INSERT INTO productos (foto, descripcion, precio) VALUES (:foto, :descripcion, :precio)`,
        req.body);
    console.log(producto);
    res.send(`Producto creado satisfactoriamente.`);
});

router.put('/producto/:id', async (req, res) => {
    const producto = await actions.update(
        `UPDATE productos SET foto = :foto, descripcion = :descripcion, precio = :precio WHERE id = :id`,
        { ...req.body, id: req.params.id });
    console.log(producto);
    res.send('Producto actualizado satisfactoriamente');

});

router.delete('/producto/', (req, res) => {
    res.send('Producto eliminado');
});

module.exports = router;