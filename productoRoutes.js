const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.listarProductos);
router.get('/nuevo', productoController.mostrarFormularioNuevo);
router.post('/', productoController.agregarProducto);
router.get('/:id/editar', productoController.editarProducto);
router.put('/:id', productoController.actualizarProducto); // Asegúrate de tener esta línea
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
