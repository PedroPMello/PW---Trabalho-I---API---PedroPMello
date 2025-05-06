const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');

router.get('/filmes', filmeController.getAllFilmes);

router.get('/filmes/:id', filmeController.getFilmeById);

router.post('/filmes', filmeController.createFilme);

router.put('/filmes/:id', filmeController.updateFilme);

router.delete('/filmes/:id', filmeController.deleteFilme);

module.exports = router;