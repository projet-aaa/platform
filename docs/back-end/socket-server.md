# Socket server

The code for the socket server is located in src-nodeserver.

*Buid socket server*
```
cd src-nodeserver
gulp build
```
This will put all the js code in nodejs and you just need to restart the nodejs docker to run the socket server.

The server boils down to a room manager that creates and destroys rooms. These rooms can be joined or left by
the different clients through socket.io messages.

Each room have a communication protocol that can be found in the respective file in the src-nodeserver/src/models/ folder.