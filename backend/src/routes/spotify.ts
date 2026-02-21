import { FastifyInstance } from "fastify";


export async function spotifyRoutes(server: FastifyInstance) {
	server.get('/auth/spotify', async (request, reply) => {
		const params = new URLSearchParams({
			response_type: 'code',
			client_id: process.env.SPOTIFY_CLIENT_ID!,
			scope: 'user-read-recently-played user-top-read user-read-currently-playing',
			redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
		});

		return reply.redirect(`https://accounts.spotify.com/authorize?${params}`);
	});

	server.get('/auth/callback', async (request, reply) => {
		const { code } = request.query as { code: string };

		// Exchange code for tokens
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`,
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
			}),
		});

		const tokens = await response.json();
		// tokens.access_token  → short lived (1h), use for API calls
		// tokens.refresh_token → long lived, store this in DB

		// TODO: save tokens.refresh_token to DB
		return tokens;
	});
}

