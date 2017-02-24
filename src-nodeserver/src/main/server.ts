import * as http from 'http'
import * as express from 'express'

import * as socketio from 'socket.io'
import * as redis from 'redis'

import { SocketServer } from './socketServer'

let app = express()
let server = http.createServer(app)
let io = socketio(server)

let redisClient = redis.createClient(6379, 'redis')
redisClient.subscribe('general')

let ss = new SocketServer(io, redisClient, true)

server.listen(8088, "jetpack1.trendio.fr", function () {
    console.log('Node app listening on port 8088!')
})
