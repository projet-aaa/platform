FROM node:boron

RUN mkdir -p /var/www
VOLUME . /var/www
WORKDIR /var/www

RUN npm install
RUN npm install -g gulp

CMD gulp build --main
