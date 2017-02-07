import * as http from 'http'
import * as express from 'express'

import * as socketio from 'socket.io'

import { SocketServer } from './socketServer'

let app = express()
let server = http.createServer(app);
let io = socketio(server)

let folderPath = process.argv[2]

if(folderPath) {
    app.get('/static', express.static(folderPath))
} else {
    app.get('/static', express.static('.'))
}

let ss = new SocketServer(io)

server.listen(8088, function () {
    console.log('Node app listening on port 8088!');
});
