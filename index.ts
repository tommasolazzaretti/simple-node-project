import fastify from 'fastify';
import {IHeaders, IUser} from "./global/interfaces/Auth";

const server = fastify()

server.get('/ping', async (request, reply) => {
    return 'pong\n'
})

server.get('/status', async (request, reply) => {
    return {
        status: 'ok'
    }
})

server.get<{
    Querystring: IUser,
    Headers: IHeaders
}>('/auth', async (request, reply) => {
    const { username, password } = request.query
    const customerHeader = request.headers['h-Custom']
    // do something with request data

    return `logged in!`
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})