# react-poc

A POC for making react interface, complete with views, api and socket communication, routing, history and more!

## install

```sh
npm install
typings install
```

## build 

```sh
gulp bundle --[nom du module]
```
Par exemple, pour tester todo: 
```sh
gulp bundle --todo
```

## run

launch the server:
```sh
node src/server/server.js
```
and check the associated page on <http://localhost:8000/static/todo> or replace todo by the name of app you want to run (the name is the same as the one of the corresponding folder situated in src/apps)

## used libraries

* [react](https://facebook.github.io/react/) : handles view rendering
* [redux](http://redux.js.org/) : handles models on the client side
* [react-redux](https://github.com/reactjs/react-redux) : the link between redux model handling and view rendering through react
* [react-router](https://github.com/ReactTraining/react-router) : enables the use of navigation and templating whilst developing a single page app
* [reselect](https://github.com/reactjs/reselect) : helpers for making Selectors
* [socket.io-client](http://socket.io/) : for web socket based real time communication with the node server
* [fetch](https://github.com/matthew-andrews/isomorphic-fetch) : for API calls

## how to contribute

### file system

* dist : the files made available by the server
 * [app name] : the folder associated to the app (html + js)
 * todo.json : a todo that can be queried
* src : the source doe
 * apps : contains the top level .ts files representing different applications
 * server : contains a server script for launching a web server and a websocket server associated to the todo example
 * utils : contains helper functions for the rest of the project
 * containers
 * models
 * store
  * reducers
  * actions
  * selectors
 * views
 
### make a view

* create a .tsx file in the views folder (anywhere inside, really, it doesn't matter here, just keep it tidy)
* copy another view and put it in the file to use it as a boilerplate
* define the props type (which are just the "parameters" of the view), if there is no parameters, put any in the generic parameter associated to props
* adapt the render function to render just what you want

### make a container

* create a .tsx file for the container in the containers folder
* copy another container and put it in the file to use it as a boilerplate
* define the mapStateToProps, and mapDispatchToProps:
 * containers are controller and are capable of a. retrieving information from the main store b. providing callbacks for dispatching actions.
 * all of this is provided to the containers view through its props 
 * mapStateToProps defines the views data by extracting them from the state using selectors
 * mapDispatchToProps defines the views action's callback
 
### modify the store

the store is made of three elements: 
* actions : they are objects that represent a modification of the store
* reducers : they interpret the actions to apply the modification
* selector : they allows the extraction of information from the store
