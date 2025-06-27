const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');
const { autenticarToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/administradores', autenticarToken, isAdmin, administradorController.getAllAdministradores);
router.get('/administradores/:id', autenticarToken, administradorController.getAdministradorById);
router.put('/administradores/:id', autenticarToken, administradorController.updateAdministrador);
router.post('/administradores', administradorController.createAdministrador);
router.delete('/administradores/:id', autenticarToken, isAdmin, administradorController.deleteAdministrador);

module.exports = router;