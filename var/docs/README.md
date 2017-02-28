#Documentation : Table of contents

 - [Back-end](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end)

    - [Technology options](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/technology-options.md)
   
    - [Architecture](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/architecture.md)
   
    - [Install](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/install.md)
  
    - [(optionnal) SSL Setup](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/ssl-setup.md)
  
    - [API](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/api.md)
    
    - [Integration & Imports](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/integration-imports.md)
  
    - [Dev - Redis messages](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/redis-messages.md)
    
    - [Tests](https://github.com/projet-aaa/platform/blob/master/var/docs/back-end/tests.md)
    
 - [Browser front-end](https://github.com/projet-aaa/platform/blob/master/var/docs/browser-front-end)    

    - [React architecture](https://github.com/projet-aaa/platform/blob/master/var/docs/browser-front-end/react-architecture.md)

    - [Build process](https://github.com/projet-aaa/platform/blob/master/var/docs/browser-front-end/build-process.md)
 
    - [Dev Tools](https://github.com/projet-aaa/platform/blob/master/var/docs/browser-front-end/dev-tools.md)

 - [Mobile front-end](https://github.com/projet-aaa/platform/blob/master/var/docs/mobile-front-end)

#Launch the project

To use that project, you need to install
- [docker](https://docs.docker.com/engine/installation/)
- [docker-compose](https://docs.docker.com/compose/install/)
 

*Clone the project*

```bash
git clone https://github.com/projet-aaa/platform.git
cd platform
```

*Launch the project*

```bash
docker-compose up # add -d if you want to run it as a daemon
```

You can then go to http://localhost to test it.
