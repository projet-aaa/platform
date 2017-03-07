# SSL Setup

SSL setup is optional. However, for a production use of Jetpack it is highly recommended to use it.

Why ? Because API relies on JWT authorization, thus everyone having a valid token means being connected. Setting up a SSL certificate for your website will avoid people listening to network to grab a token.


 - Get a private key and its certificate. To generate your own self-signed certificate, jump to the end of that document
 
 - Put your key and certificate in `docker/tls` folder. As long as those key are used in both traefik and nodejs, they should be named server.key (for your private key) and server.crt (for its certificate)
 
 - Edit docker-compose.yml to uncomment lines beginning with `###` and comment the port section of web container. This will add Traefik, a reverse proxy to manage SSL at runtime, to your infrastructure.

 - Stop your infrastructure and relaunch it `docker-compose stop && docker-compose up -d`

## Generate a self-signed certificate

Be sure to have `openssl` installed on the host machine. The go to the Jetpack root directory 

```bash
cd docker/tls
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
...
openssl rsa -passin pass:x -in server.pass.key -out server.key
writing RSA key
rm server.pass.key
openssl req -new -key server.key -out server.csr

# ...
# Country Name (2 letter code) [AU]:FR
# State or Province Name (full name) [Some-State]:Bretagne
# ...
# Let that field blank
# A challenge password []:
# ...
#Generate SSL certificate
# The self-signed SSL certificate is generated from the server.key private key and server.csr files.

openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

If you respect naming conventions, websocket server will automatically boot on ssl mode.
Otherwise you will have to adapt names in `src-nodeserver/src/main/server.ts`.

## Use a Letsencrypt certificate

To have a valid SSl certificate, you can manage to get a valid Letsencrypt certificate. Letsencrypt is a non-profit organization which aims at encrypting the whole web and provides free, valid SSL certificates.

 - Install Apache on the host machine
 - define a `Servername` with the domain pointing on your server in `/etc/apache2/sites-available/000-default.conf`
 - Run the [LetsEncrypt](https://letsencrypt.org/) agent with apache option. It should detect automatically your domain name if Servername is well configured
 - copy the issued certificates to `docker/tls` folder and adapt their name to match naming convention. Verify that server.key is a gpg key and server.crt is well formed.


## Example of a docker-compose.yml ready for SSL

```yaml
# If you want to use an SSL certificate : check the documentation in var/docs/back-end

# Api server and main website
web:
    build: .
    environment:
        SYMFONY_ENV: dev
    links:
        - database
        - redis
    volumes:
        - .:/app
    labels:
        - "traefik.backend=web-jetpack"
        - "traefik.frontend.rule=Host:jetpack0.trendio.fr"

#Persistent data storage
database:
    image: mysql
    environment:
        MYSQL_ROOT_PASSWORD: changeme
        MYSQL_DATABASE: api_platform
        MYSQL_USER: api_platform
        MYSQL_PASSWORD: api_platform
    volumes:
        - "./docker/mysql:/var/lib/mysql"

#Message queue
redis:
    image: redis

#Web socket server
nodejs:
    build: nodejs
    links:
        - redis
    volumes:
        - ./nodejs:/app
        - ./docker/tls:/tls
    ports:
        - 8080:8080

traefik:
    image: traefik:camembert
    command: |
        -c /dev/null --web --docker --docker.domain=docker.localhost --logLevel=DEBUG
        --defaultEntryPoints='http,https' --entryPoints='Name:http Address::80 Redirect.EntryPoint:https'
        --entryPoints='Name:https Address::443 TLS:/tls/server.crt,/tls/server.key'
### Comment the former line and un comment the followiung to get a letsencrypt ssl certificate (won't work for websockets) 
###        --acme.entryPoint=https
###        --acme.email='REPLACE_WITH_YOUR_EMAIL' --acme.storage=/tls/acme.json --acme.onDemand=true
    ports:
        - "80:80"
###     - "8080:8080"
        - "443:443"
    volumes:
        - /var/run/docker.sock:/var/run/docker.sock
        - ./docker/tls:/tls

```
