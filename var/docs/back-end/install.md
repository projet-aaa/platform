# Install

Before Jetpack installation, install

 - [Docker](https://docs.docker.com/engine/installation/)
 
 - [Docker-compose](https://docs.docker.com/compose/install/) Beware, Ubuntu 16 repositories aren't suitable because their version is too old.
 
 Then follow that script :
 
```bash
    #clone the project
    git clone https://github.com/projet-aaa/platform.git
    cd platform
    docker-compose up # add -d if you want to run it as daemon
```

Once the build process is over, execute : 

```bash
    #create the database schema
    docker-compose exec web php bin/console doctrine:schema:create
    #load default data
    docker-compose exec web php bin/console doctrine:fixtures:load -n
```

On dev mode, you can create an account on [http://localhost/app_dev.php/register](http://localhost/app_dev.php/register)

Defaults accounts are :

 - admin/admin
 - prof/prof
 - eleve/eleve
 - and one for each member of the jetpack team (their ldap login)