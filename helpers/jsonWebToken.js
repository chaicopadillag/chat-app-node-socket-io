const jwt = require('jsonwebtoken');

const generarJsonWebToken = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.SECRET_SEMILLA_JSON_WEN_TOKEN,
			{
				expiresIn: '24h',
			},
			(error, token) => {
				if (error) {
					console.log('No se puedo generar el Token: ' + error);
					reject(error);
				} else {
					resolve(token);
				}
			}
		);
	});
};
const comprobarJsonWebToken = (token = '') => {
	try {
		const { uid } = jwt.verify(token, process.env.SECRET_SEMILLA_JSON_WEN_TOKEN);
		return [true, uid];
	} catch (error) {
		return [false, error];
	}
};

module.exports = { generarJsonWebToken, comprobarJsonWebToken };
