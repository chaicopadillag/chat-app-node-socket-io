const mongoose = require('mongoose');

const dbConexion = async () => {
	try {
		await mongoose.connect(process.env.CNN_MONDO_DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('DB Online');
	} catch (error) {
		throw new Error('Error en la base de datos: ' + error);
	}
};

module.exports = dbConexion;
