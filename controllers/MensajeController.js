const Mensaje = require('../models/mensaje');

const getMensajes = async (req, res) => {
	try {
		const myUid = req.uid;
		const uidDe = req.params.uidDe;
		const ultimosMensajes = await Mensaje.find({
			$or: [
				{ de: myUid, para: uidDe },
				{ de: uidDe, para: myUid },
			],
		})
			.sort({ createAt: 'desc' })
			.limit(30);
		return res.status(200).json({
			status: 200,
			statusText: `Mensajes cargadores`,
			ultimosMensajes,
		});
	} catch (error) {
		console.log(`Error en: ${error}`);
		return res.status(500).json({
			status: 500,
			statusText: 'Error en cargar los mensajes',
		});
	}
};

module.exports = getMensajes;
