var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server)
var path = require('path');

app.use('/static', express.static('../../dist'))

io.on('connection', function(socket){
    console.log("Socket connected: " + socket.id);
    socket.on('action', function(action) {
        console.log(action)
        if(action.type === 'SERVER/MSG'){
            console.log("msg: " + action.payload.text )      
            socket.emit('action', {type:'message', data:'good day!'});
        }
    })

    socket.on('test', function(data) {
      console.log(data)
    });
});

server.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});
