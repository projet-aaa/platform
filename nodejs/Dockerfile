FROM node:boron

WORKDIR work/src-nodeserver 

RUN npm install 
RUN npm install gulp
RUN ls ../..
RUN gulp deploy

WORKDIR work/nodejs

CMD node js/index.js
