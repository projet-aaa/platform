#Documentation : Table of contents

 - [Back-end](/back-end)

    - [Technology options](/back-end/technology-options.md)
   
    - [Architecture](/back-end/architecture.md)
   
    - [Install](/back-end/install.md)
  
    - [(optionnal) SSL Setup](/back-end/ssl-setup.md)
  
    - [API](/back-end/api.md)
    
    - [Integration & Imports](/back-end/integration-imports.md)
  
    - [Dev - Redis messages](/back-end/redis-messages.md)
    
    - [Tests](/back-end/tests.md)

    - [Socket server](/back-end/socket-server.md)
    
 - [Browser front-end](/browser-front-end)    

    - [React architecture](/browser-front-end/react-architecture.md)

    - [Build process](/browser-front-end/build-process.md)
 
    - [Dev Tools](/browser-front-end/dev-tools.md)

 - [Mobile front-end](/mobile-front-end)

#Launch the project

To use that project, you need to install
- [docker](https://docs.docker.com/engine/installation/)
- [docker-compose](https://docs.docker.com/compose/install/)
 

*Clone the project*

```bash
git clone https://github.com/projet-aaa/platform.git
cd platform
```

*Build the project*
To build the web interface:
```bash
cd src-hmi
gulp build
```

To build the node server:
```bash
cd src-nodeserver
gulp build
```

*Launch the project*

```bash
docker-compose up # add -d if you want to run it as a daemon
```

You can then go to http://localhost to test it.