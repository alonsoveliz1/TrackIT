import 'dotenv/config';
import Fastify from 'fastify';
import { spotifyRoutes } from './routes/spotify';

const server = Fastify({
	logger: true
});

server.register(spotifyRoutes);

server.get('/', async (request, reply) => {
	return { hello: 'word' }
})

const start = async () => {
	try {
		await server.listen({ port: 3000 })
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}

}
start()
