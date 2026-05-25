const express = require('express');
const router = express.Router();

const controller = require('../controllers/inmueble.controller');

router.get('/inmuebles', controller.getAll);
router.get('/inmuebles/:id', controller.getById);
router.post('/inmuebles', controller.create);
router.put('/inmuebles/:id', controller.update);
router.delete('/inmuebles/:id', controller.delete);

module.exports = router;