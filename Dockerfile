FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN cd ./client && npm install && npm run build && cd ..

RUN cd ./server && npm install && npm install -g typescript && tsc && cd ..

CMD ["node", "./server/bin/www"]

EXPOSE 3000
