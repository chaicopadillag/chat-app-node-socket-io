const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
	const errores = validationResult(req);

	if (!errores.isEmpty()) {
		return res.status(400).json({
			status: 400,
			statusText: 'Todos los campos son requeridos',
			errores: errores.mapped(),
		});
	}

	next();
};

module.exports = validarCampos;
