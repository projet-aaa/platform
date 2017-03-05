// EXTERNAL IMPORTS
import * as http from 'http'
import * as https from 'https'
import * as express from 'express'
import * as socketio from 'socket.io'
import * as redis from 'redis'
import * as fs from 'fs'

// INTERNAL IMPORTS
import { SocketServer } from './socketServer'

import { domain, port, debug, log } from '../models/consts'

let sslmode_available = fs.existsSync('/tls/server.key') && fs.existsSync('/tls/server.crt');

// CREATE SOCKET IO SERVER
let app = express()
let server = null;
if(!sslmode_available){
    server = http.createServer(app)
    console.log('Server created for http mode (no SSL) ');
}
else{
    let options = {
        key: fs.readFileSync('/tls/server.key'),
        cert: fs.readFileSync('/tls/server.crt')
    };
    server = https.createServer(options,app);
    console.log('Server created for https mode (SSL)');
}
let io = socketio(server)

// CREATE REDIS CLIENT
let redisClient = redis.createClient(6379, 'redis')
redisClient.subscribe('general')

// CREATE SERVER
let ss = new SocketServer(io, redisClient, log)

// LISTEN
if(debug){
    server.listen(port, function () {
        console.log('Node app listening on port ' + port + '!')
    })
} else {
    server.listen(port);
    console.log('Node app listening on port ' +  port + '!');
}
