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
 
 
 **Tips**
 
 Here is a quick snippet to install Docker and Docker-compose on your Ubuntu 16.04 server :
 
 ```bash
sudo apt-get update
sudo apt-get -y install curl linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get -y install apt-transport-https ca-certificates
curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -
sudo add-apt-repository "deb https://apt.dockerproject.org/repo/  ubuntu-$(lsb_release -cs)  main"
sudo apt-get update
sudo apt-get -y install docker-engine
docker --version

#install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.10.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```