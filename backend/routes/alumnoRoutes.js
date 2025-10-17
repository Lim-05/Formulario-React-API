const express = require('express');
const router = express.Router();
const alumnoCtrl = require('../controllers/alumnoController');

router.get('/', alumnoCtrl.obtenerTodos);
router.get('/:id_alumno', alumnoCtrl.obtenerPorId);
router.post('/', alumnoCtrl.crear);
router.put('/:id_alumno', alumnoCtrl.actualizar);
router.delete('/:id_alumno', alumnoCtrl.eliminar);

module.exports = router;
