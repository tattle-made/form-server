FROM node:10.16.3-jessie

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3002

RUN npm install -g nodemon

CMD ["nodemon", "index.js"]