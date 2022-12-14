import fastify from 'fastify';
import cors from '@fastify/cors'
import {IHeaders, IUser} from "./global/interfaces/Auth";
import {AxiosResponse} from "axios";

const axios = require('axios');
const server = fastify();

server.register(cors, {
    // put your options here
})

const AXIOS_HEADERS: any = {
    'app-id': '634929d545ebdf36e1a19608'
};

server.get('/status', async (request, reply) => {
    return {
        status: 'ok'
    }
})

server.get<{
    Querystring: IUser,
    Headers: IHeaders
}>('/auth', async (request, reply) => {
    const {username, password} = request.query
    const customerHeader = request.headers['h-Custom']
    // do something with request data

    return `logged in!`
})

/**
 * getAll posts *paginated
 */
server.post('/getPost', async (request, reply) => {
    let optionalParams: any = request.body;
    let url = 'https://dummyapi.io/data/v1/post';

    if (request.body) {
        url = url.concat('?');
        optionalParams.limit ? url = url.concat(`limit=${optionalParams.limit}`) : null;
        optionalParams.page ? url = url.concat(`&page=${optionalParams.page}`) : null;
    }

    await axios.get(url, {headers: AXIOS_HEADERS})
        .then((res: AxiosResponse<any>) => {
            reply.send(res.data);
        })
        .catch((err: { message: string; }) => {
            console.log('Error: ', err.message);
        });

    return reply;
})

/**
 * getAll posts *by user
 */
server.get('/getPostByUser', async (request, reply) => {
    await axios.get('https://dummyapi.io/data/v1/user/:id/post', {headers: AXIOS_HEADERS})
        .then((res: AxiosResponse<any>) => {
            reply.send(res.data);
        })
        .catch((err: { message: string; }) => {
            console.log('Error: ', err.message);
        });

    return reply;
})

/**
 * create a new Post
 */
server.post('/createPost', async (request, reply) => {
    let optionalParams: any = request.body;

    await axios.post(
        'https://dummyapi.io/data/v1/post/create',
        optionalParams,
        {headers: AXIOS_HEADERS}
    )
        .then((res: AxiosResponse<any>) => {
            reply.send(res.data);
        })
        .catch((err: { message: string; }) => {
            console.log('Error: ', err.message);
        });

    return reply;
})

/**
 * update an existing post
 */
server.post('/updatePost', async (request, reply) => {
    let optionalParams: any = request.body;

    await axios.put(
        `https://dummyapi.io/data/v1/post/${optionalParams.id}`,
        optionalParams,
        {headers: AXIOS_HEADERS}
    )
        .then((res: AxiosResponse<any>) => {
            reply.send(res.data);
        })
        .catch((err: { message: string; }) => {
            console.log('Error: ', err.message);
        });

    return reply;
})

/**
 * delete an existing post
 */
server.post('/deletePost', async (request, reply) => {
    let optionalParams: any = request.body;
    await axios.delete(`https://dummyapi.io/data/v1/post/${optionalParams.id}`, {headers: AXIOS_HEADERS})
        .then((res: AxiosResponse<any>) => {
            reply.send(res.data);
        })
        .catch((err: { message: string; }) => {
            console.log('Error: ', err.message);
        });

    return reply;
})

server.listen({port: 8080}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})