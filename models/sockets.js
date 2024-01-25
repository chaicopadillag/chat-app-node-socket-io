const { getUsuarios, setOnline, setOffline, saveMessage } = require('../controllers/SocketsController');
const { comprobarJsonWebToken } = require('../helpers/jsonWebToken');

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', async (socket) => {
			const [valido, uid] = comprobarJsonWebToken(socket.handshake.query['x-token']);

			if (!valido) {
				console.log('Cliente con Token no Identificado');
				return socket.disconnect();
			}
			await setOnline(uid);
			/**
			 * TODO: validar jwt
			 * si el token no es válido desconectar
			 */
			//unir al usuario a una sala de socket.io
			socket.join(uid);
			// FIXME: saber que el usuario está activo mediante el UID
			// TODO: emiti todos los usuarios conectados
			this.io.emit('listas-usuarios', await getUsuarios());
			// FIXME: Socket join uid
			// TODO: escuchar cuando el cliente manda un mensaje mensje personal
			socket.on('mensaje-uno-a-uno', async (mensaje) => {
				const newMensaje = await saveMessage(mensaje);
				this.io.to(mensaje.de).emit('mensaje-uno-a-uno', newMensaje); //TODO: eliminar este
				this.io.to(mensaje.para).emit('mensaje-uno-a-uno', newMensaje);
			});
			// FIXME: Deconectar mandar en la db que el usario se desconecto
			// TODO: emitir todos los usuarios conectados

			socket.on('disconnect', async () => {
				console.log('Cliente desconectado');
				await setOffline(uid);
				this.io.emit('listas-usuarios', await getUsuarios());
			});
		});
	}
}

module.exports = Sockets;
