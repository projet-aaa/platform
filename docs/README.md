#Documentation : Table of contents
 - [Manual](/docs/man.md)

 - [Back-end](/docs/back-end)
   
    - [Architecture](/docs/back-end/architecture.md)
   
    - [Install](/docs/back-end/install.md)
  
    - [(optionnal) SSL Setup](/docs/back-end/ssl-setup.md)
  
    - [API](/docs/back-end/api.md)
    
    - [Integration & Imports](/docs/back-end/integration-imports.md)
  
    - [Dev - Redis messages](/docs/back-end/redis-messages.md)
    
    - [Tests](/docs/back-end/tests.md)

    - [Socket server](/docs/back-end/socket-server.md)
    
 - [Browser front-end](/docs/browser-front-end)    

    - [React architecture](/docs/browser-front-end/react-architecture.md)

    - [Build process](/docs/browser-front-end/build-process.md)
 
    - [Dev Tools](/docs/browser-front-end/dev-tools.md)

 - [Mobile front-end](/docs/mobile-front-end)
 
 - [Jetpack PDF Viewer](https://github.com/projet-aaa/electron-pdfjs)

#Launch the project

To use that project, you at least need to install
- [docker](https://docs.docker.com/engine/installation/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [node/npm](https://nodejs.org/en/)
 
*Clone the project*

```bash
git clone https://github.com/projet-aaa/platform.git
cd platform
```

*Build the project*
To build the web interface:
```bash
cd src-hmi # à partir de la racine
npm install
npm install -g gulp 
gulp build
```

To build the node server:
```bash
cd src-nodeserver # à partir de la racine
npm install
npm install -g gulp
gulp build
```

*Launch the project*

```bash
docker-compose up # add -d if you want to run it as a daemon
```

You can then go to http://localhost to test it.
