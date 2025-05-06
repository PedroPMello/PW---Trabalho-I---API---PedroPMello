const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

router.get('/administradores', administradorController.getAllAdministradores);

router.get('/administradores/:id', administradorController.getAdministradorById);

router.post('/administradores', administradorController.createAdministrador);

router.put('/administradores/:id', administradorController.updateAdministrador);

router.delete('/administradores/:id', administradorController.deleteAdministrador);

module.exports = router;