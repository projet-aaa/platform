#React architecture

##Table of contents

- [Prerequisites](#Prerequisites): What is needed to understand and modify the code

- [Technology used](#Technology used): The list of all technology used with React 

- [Architecture](#Architecture) 

##Prerequisites

First, the tools of development should be well understood

- Node: Node is a js execution environment which we used on the client side to compile and build our code. 

- Gulp: Gulp is a js library that is run on node and that takes care of building our code. If you wish to understand or modify the build process, you need to understand gulp.

- Javascript: Required for web application development.

- Typescript: Typescript is a "super set" to javascript: it adds the concepts of types to javascript and thus allows us to make the code more tidy and less error prone. If you know javascript, typescript should come naturally.

- HTTP/HTML/CSS: I mean, its the basics of web development. Also check [Bootstrap](http://getbootstrap.com/) and [FontAwesome](http://fontawesome.io/) to see what CSS library. 

Then you need to understand the following libraries:

- React: You should read the ["get started"](https://facebook.github.io/react/tutorial/tutorial.html) to React to grasp the philosophy of React. React is the library that takes care of rendering views whilst offering a simple HTML like organization pattern. If you understand HTML, it should come quite naturally. It is also extremely well maintained (made by Facebook) and there is no shortage of help online aswell as external libraries to render whatever you wish to render in the application.

- Redux: If React takes care of rendering the view, redux is the library that manages the client side "models" of the application. It is a bit complicated too grasp redux at first but their [website](http://redux.js.org/) does a fantastic job at explaining how it works: just read their website from top to bottom (~2-3h) and you will fully understand how it works.

- Socket-io: Web sockets are a mean to establish real time communication between the client and the server and socket io is an implementation of web sockets.

##Technology used

Aside from the libraries mentionned in the prerequisites, we also use:

- Node/Gulp: Node is a js execution environment and gulp is a js library that runs on node to compile our code. 

- NPM (Node package manager): It is used to fetch the necessary modules that are compiled with our application

- Visual studio code: It is a cross platform IDE that is perfect for developing our application. It is very light weight and we highly recommend you install it (whether you work on Windows or Linux)

The NPM modules used can be found in src-hmi/package.json, the main ones are:

- react: duh.
- redux: double duh.
- react-redux: a library that serves as a bridge between the model handling of redux and the view rendering of react.
- react-router: The application is an SPA (Single page application) so for handling the changing of the URL and the navigation in the application, we use this library.
- react-responsive: Allows use to make the application responsive and run it on mobile aswell as desktop.
- socket.io-client: The socket io client.
- redux-api-middleware: This is a redux middleware that allows us to send API Calls and handle their response within the redux ecosystem

##Architecture

We suppose that you are well informed on how all of the external libraries work. This section will explain
how we use React.

###File system

The code for the application is located in src-hmi. In this folder you can find:

- Dockerfile: for running the production build (see [build process](https://github.com/projet-aaa/platform/blob/master/var/docs/browser-front-end/build-process.md))
- package.json: The description of the npm package and the list of dependencies
- gulpfile.js: The script that is run for building 
- src: The folder containing the code

Other folders and files can be generated but aren't versionned.

In the src folder, you can find the `tsconfig.json` file: it is used to define the compilation option for the typescript. You can also find the following folders:

- apps: every folder in that folder represents a React application that can be run. The "main" app is what is actually used but the other folder allow us to test out smaller functionnality without having to go through the entire website. (For example: quiz allows us to test the a quiz application)

- containers: Contains all the React containers of the application organized by section of the application

- dist: Contains all the static assets that are deployed. The style and html should be modified here and nowhere else

- models: Contains the typescript models used through out the application

- server: Contains the code for a static web server. Go in the folder and run node server.js so you can access all the ressources in src-hmi/dist (For example, you can run any application by using : localhost:8000/static/[name of the application]

- store: Contains all the code that manages the state of the application. For every sections, you can find:
  - reducers: The redux reducers of the application

  - actions: The redux action creators of the application

- utils: Where all the helper functions should be situated

- views: Contains all the React components

- templates: Contains wrapping views that handle the common aspects of the interface (head band, left menu..)

- mobile: Source code of the mobile application. At the time of writing, their is no more than a "POC".

###HOW TO

Though you might want to modify the architecture at some point, adding features to the application boils down to the following tasks:

- create views: go in the views folder to create a view (copy an existing one for frame of reference).

- create containers: got in the containers folder and create a container (copy an existing one for frame of reference) and pick a view to connect the container to (remember, in react-redux, a container is the interface between redux and react views).

- create a new part of the global state: if you need to store more information in the application, you will likely have to create a new part of the redux store. To do so, go in the store folder, create a folder with the name of the state (first, make sure that your state is not already present some where in the existing store). In that folder create all the actions and reducer files you need (use other reducer and actions files for reference).

- create API actions: Their are two ways of making API calls: chaining "fetches" (see src/store/wsrooms/actions for reference) and redux-api-middleware (see src/store/remote/actions/actions for reference).