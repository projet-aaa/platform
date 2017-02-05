console.log("before http")
import * as http from 'http'

console.log("before express")
import * as express from 'express'

import * as socketio from 'socket.io'

import { SocketServer } from './socketServer'

let app = express()
let server = http.createServer(app);
let io = socketio(server)

let folderPath = process.argv[2]
app.use('/static', express.static(folderPath))

let ss = new SocketServer(io)

server.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
