const { Router } = require('express');
const getMensajes = require('../controllers/MensajeController');
const validarJsonWebToken = require('../middlewares/validarJsonWebToken');

const router = Router();

router.get('/:uidDe', validarJsonWebToken, getMensajes);

module.exports = router;
