const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJsonWebToken } = require('../helpers/jsonWebToken');

const authRegistro = async (req, res = response) => {
	try {
		const { correo, password } = req.body;

		const correoCheck = await Usuario.findOne({ correo });

		if (correoCheck) {
			return res.status(400).json({
				status: 400,
				statusText: 'El correo ya fue registrado en nuestro App',
			});
		}

		const usuario = new Usuario(req.body);

		// encriptar password
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);
		// crear json web token
		const token = await generarJsonWebToken(usuario.id);

		await usuario.save();

		return res.status(200).json({
			status: 200,
			statusText: 'Usuario registrado correctamente',
			usuario: {
				nombre: usuario.nombre,
				correo: usuario.correo,
				uid: usuario.id,
				online: usuario.online,
				token,
			},
		});
	} catch (error) {
		console.log(`Error en Registro: ${error}`);

		return res.status(500).json({
			status: 500,
			statusText: 'Error al crear un usuario',
		});
	}
};

const authLogin = async (req, res = response) => {
	try {
		const { correo, password } = req.body;

		const usuario = await Usuario.findOne({ correo });

		if (!usuario) {
			return res.status(404).json({
				status: 404,
				statusText: 'El correo no fue encontrado',
			});
		}

		// validar password
		const validarPassword = bcrypt.compareSync(password, usuario.password);

		if (!validarPassword) {
			return res.status(404).json({
				status: 404,
				statusText: 'La contraseña es incorrecta',
			});
		}

		const token = await generarJsonWebToken(usuario.id);

		return res.status(200).json({
			status: 200,
			statusText: 'Usuario logueado',
			usuario: {
				nombre: usuario.nombre,
				correo: usuario.correo,
				uid: usuario.id,
				online: usuario.online,
				token,
			},
		});
	} catch (error) {
		console.log(`Error en login: ${error}`);

		return res.status(500).json({
			status: 500,
			statusText: 'Error al crear un usuario',
		});
	}
};

const authTokenCheck = async (req, res = response) => {
	try {
		const uid = req.uid;
		const token = await generarJsonWebToken(uid);
		const usuario = await Usuario.findById(uid);

		return res.status(200).json({
			status: 200,
			statusText: 'Usuario logueado',
			usuario: {
				nombre: usuario.nombre,
				correo: usuario.correo,
				uid: usuario.id,
				online: usuario.online,
				token,
			},
		});
	} catch (error) {
		console.log(`Error en login: ${error}`);

		return res.status(500).json({
			status: 500,
			statusText: 'Error al verificar el token',
		});
	}
};

module.exports = { authLogin, authRegistro, authTokenCheck };
