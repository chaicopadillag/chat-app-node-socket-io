/**
 * path: api/auth
 *
 */
const { Router } = require('express');
const { check } = require('express-validator');
// Controladores
const { authRegistro, authLogin, authTokenCheck } = require('../controllers/AuthController');
const validarCampos = require('../middlewares/validarCampos');
const validarJsonWebToken = require('../middlewares/validarJsonWebToken');

const router = Router();

router.post(
	'/registro',
	[
		check('nombre', 'El nombre es requerido y debe ser más de 3 carácteres').isLength({ min: 3 }),
		check('correo', 'El correo es requerido').not().isEmpty(),
		check('password', 'La contraseña es requerido, Min. 6 carácteres').isLength({ min: 6 }),
		validarCampos,
	],
	authRegistro
);

router.post('/', [check('correo', 'El correo es obligatorio').isEmail(), check('password', 'El password es obligatorio').not().isEmpty(), validarCampos], authLogin);

router.get('/token-check', validarJsonWebToken, authTokenCheck);

module.exports = router;
