const jwt = require('jsonwebtoken');

const validarJsonWebToken = (req, res, next) => {
	try {
		const token = req.header('x-token');

		if (!token) {
			return res.status(401).json({
				status: 401,
				statusText: 'NO hay Token en la petición',
			});
		}

		const { uid } = jwt.verify(token, process.env.SECRET_SEMILLA_JSON_WEN_TOKEN);
		req.uid = uid;
		next();
	} catch (error) {
		console.log(`Error en: ${error}`);
		return res.status(401).json({
			status: 401,
			statusText: 'El Token no es válido',
		});
	}
};

module.exports = validarJsonWebToken;
