var redis = require('redis').createClient(6379, 'redis')
  , http = require('http')
  , sock = require('sockjs')
  , fs = require('fs');
 
/*
* Store all connected clients
*/
 
var sockets = {};
 
/*
* Create websockets server and attach listeners
*/
 
var socketServer = sock.createServer();
 
socketServer.on('connection', function(conn) {
    sockets[conn.id] = conn;
});
 
/*
* Cache front-end file
*/
 
var front = fs.readFileSync(__dirname  + '/index.html', { encoding: 'utf8' });
 
/*
* Create http server
*/
 
var httpServer = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(front);
}).listen(8088);
 
/*
* Hook websockets in to http server
*/
 
socketServer.installHandlers(httpServer, { prefix: '/websockets' });
 
/*
* Subscribe to 'updates' channel
*/
 
redis.subscribe('updates');
 
/*
* Push incoming message to all connected clients
*/
 
redis.on('message', function(channel, data) {
    for (var id in sockets) {
        sockets[id].write(data);
    }
});
