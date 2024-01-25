const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const setOnline = async (uid) => {
	const usuario = await Usuario.findById(uid);
	usuario.online = true;
	await usuario.save();

	return usuario;
};

const setOffline = async (uid) => {
	const usuario = await Usuario.findById(uid);
	usuario.online = false;
	await usuario.save();

	return usuario;
};
const getUsuarios = async () => {
	const usuarios = await Usuario.find().sort('-online');
	return usuarios;
};

const saveMessage = async (payload) => {
	try {
		const mensaje = new Mensaje(payload);
		await mensaje.save();
		return mensaje;
	} catch (error) {
		console.log('Error en: ' + error);
	}
};

module.exports = { setOnline, setOffline, getUsuarios, saveMessage };
