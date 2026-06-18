const express = require('express');
const router = express.Router();

const controller = require('../controllers/inmueble.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/inmuebles', controller.getAll);
router.get('/inmuebles/:id', controller.getById);
router.post('/inmuebles', verifyToken, controller.create);
router.put('/inmuebles/:id', verifyToken, controller.update);
router.delete('/inmuebles/:id', verifyToken, controller.delete);

module.exports = router;