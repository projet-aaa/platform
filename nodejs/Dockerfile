FROM node:boron

RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install

CMD [ "npm", "start" ]


