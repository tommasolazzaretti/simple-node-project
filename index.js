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
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
const axios = require('axios');
const server = (0, fastify_1.default)();
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
const bodyJsonSchema = fluent_json_schema_1.default.object()
    .additionalProperties(false)
    .prop('title', fluent_json_schema_1.default.string())
    .prop('author', fluent_json_schema_1.default.string());
// Note that there is no need to call `.valueOf()`!
const schema = {
    body: bodyJsonSchema,
    /*response: {
      200: S.object().prop('status', S.string()))
    },*/
};
/**
 * getAll posts *paginated
 */
server.get('/getPost', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios.get('https://dummyapi.io/data/v1/post', { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    console.log("return nooooooooow");
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
    yield axios.post('https://dummyapi.io/data/v1/post', { headers: AXIOS_HEADERS })
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
    yield axios.put('https://dummyapi.io/data/v1/post', { headers: AXIOS_HEADERS })
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
    yield axios.delete('https://dummyapi.io/data/v1/post', { headers: AXIOS_HEADERS })
        .then((res) => {
        reply.send(res.data);
    })
        .catch((err) => {
        console.log('Error: ', err.message);
    });
    return reply;
}));
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
