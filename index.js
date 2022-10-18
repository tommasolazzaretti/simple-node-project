"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const axios = require('axios');
const server = (0, fastify_1.default)({
    logger: true
});
server.register(cors_1.default, {
// put your options here
});
const AXIOS_HEADERS = {
    'app-id': '634929d545ebdf36e1a19608'
};
server.get('/status', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: 'ok'
    };
}));
server.get('/auth', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.query;
    const customerHeader = request.headers['h-Custom'];
    // do something with request data
    return `logged in!`;
}));
/**
 * getAll posts *paginated
 */
server.post('/getPost', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let optionalParams = request.body;
    let url = 'https://dummyapi.io/data/v1/post';
    if (request.body) {
        url = url.concat('?');
        optionalParams.limit ? url = url.concat(`limit=${optionalParams.limit}`) : null;
        optionalParams.page ? url = url.concat(`&page=${optionalParams.page}`) : null;
    }
    yield axios.get(url, { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    return reply;
}));
/**
 * getAll posts *by user
 */
server.get('/getPostByUser', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios.get('https://dummyapi.io/data/v1/user/:id/post', { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    return reply;
}));
/**
 * create a new Post
 */
server.post('/createPost', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let optionalParams = request.body;
    yield axios.post('https://dummyapi.io/data/v1/post/create', optionalParams, { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    return reply;
}));
/**
 * update an existing post
 */
server.post('/updatePost', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let optionalParams = request.body;
    yield axios.put(`https://dummyapi.io/data/v1/post/${optionalParams.id}`, optionalParams, { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    return reply;
}));
/**
 * delete an existing post
 */
server.post('/deletePost', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    let optionalParams = request.body;
    yield axios.delete(`https://dummyapi.io/data/v1/post/${optionalParams.id}`, { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    return reply;
}));
server.listen({ port: 8080 }, (err, address) => {
    console.log(`Server listening at ${address}`);
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
